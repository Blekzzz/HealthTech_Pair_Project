const { User, Disease, MedicalHistory, Symptomp } = require('../models')
const bcrypt = require('bcryptjs')

class Controller {
    static home(req, res) {
        const id = req.session.userId
        Disease.findAll()
            .then(data => {
                res.render('home', { data, id })
            })
            .catch(err => {
                res.send(err)
                console.log(err)
            })
    }

    static register(req, res) {
        const error = req.query.error

        res.render('registerPage', { error })
    }

    static postRegister(req, res) {
        User.create(req.body)
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => {
                if (err.name == "SequelizeValidationError") {
                    let theError = err.errors.map(el => {
                        return el.message
                    })
                    res.send(theError)
                }
                console.log(err)
            })
    }

    static login(req, res) {
        let errors = req.query.error
        res.render('loginPage', { errors })
    }

    static postLogin(req, res) {
        const { username, password } = req.body
        User.findOne({
            where: {
                username
            }
        })
            .then(user => {
                const isValidPass = bcrypt.compareSync(password, user.password)
                if (isValidPass) {
                    req.session.userId = user.id
                    req.session.userRole = user.role
                    return res.redirect('/')
                } else {
                    const error = 'Invalid username or password, please input the right one!!'
                    res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => {
                res.send(err)
                console.log(err)
            })
    }

    static detailDiseases(req, res) {
        const diseasesId = req.params.diseasesId
        // console.log(id)
        const id = req.session.userId
        Disease.findByPk(diseasesId, {
            include: Symptomp
        })
            .then(data => {
                // res.send(data)
                res.render('diseasesDetail', { data, id })
            })
            .catch(err => {
                res.send(err)
                console.log(err)
            })
    }

    static medicalHistory(req, res) {
        // console.log(req.session.userId)
        const id = req.session.userId
        // console.log(id)

        User.findByPk(id, {
            include: MedicalHistory
        })
            .then(data => {
                res.render('medicalHistory', { data, id })
                // res.send(data)
            })
            .catch(err => {
                res.send(err)
                console.log(err)
            })
    }

    static postMedicalHistory(req, res) {
        const id = req.session.userId
        const { diseasesHistory, medicineAllergy } = req.body
        MedicalHistory.create({ diseasesHistory, medicineAllergy, UserId: id })
            .then(() => {
                res.redirect(`/medicalHistories/${id}`)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static postUpdateMedicalHistory(req, res) {
        const id = req.session.userId
        MedicalHistory.update(req.body, {
            where: {
                UserId: id
            }
        })
            .then(() => {
                res.redirect(`/medicalHistories/${id}`)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = Controller