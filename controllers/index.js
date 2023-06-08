const { User, Disease, MedicalHistory, Symptomp, DiseaseSymptomp } = require('../models')
const bcrypt = require('bcryptjs')
const { main } = require('../helper/sentMail')
const { Op } = require('sequelize')

class Controller {
    static home(req, res) {
        const id = req.session.userId
        const role = req.session.role

        const options = {
            where: {}
        }
        let search = req.query.search
        if (search) {
            options.where.name = {
                [Op.iLike]: `%${search}%`
            }
        }

        let user;

        User.findByPk(id)
            .then(userData => {
                user = userData
                // res.send(userData)
                return Disease.findAll(options);
            })
            .then(data => {
                const foundedAt = Disease.dateFind(new Date())
                res.render('home', { user, data, role, id, Disease, foundedAt })
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
        User.findAll()
            .then(user => {
                let name = user.map(el => {
                    return el.username
                })
                if (name.indexOf(req.body.username) >= 1) {
                    const error = "email has been already used"
                    return res.redirect(`/register/error=${error}`)
                }
                return User.create(req.body)
            })
            .then(() => {
                main(req.body.email)
                res.redirect('/login')
            })
            .catch(err => {
                if (err.name == "SequelizeValidationError") {
                    let theError = err.errors.map(el => {
                        return el.message
                    })
                    res.redirect(`/register?error=${theError}`)
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
                    req.session.role = user.role
                    return res.redirect('/')
                } else {
                    const error = 'Invalid username or password, please input the right one!!'
                    res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => {
                const error = 'Invalid username or password, please input the right one!!'
                res.redirect(`/login?error=${error}`)
                console.log(err)
            })
    }

    static detailDiseases(req, res) {
        const diseasesId = req.params.diseasesId
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
        const id = req.session.userId

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

    static addDiseases(req, res) {
        const id = req.session.userId
        let error = req.query.error
        Symptomp.findAll()
            .then(symptomps => {
                res.render('addDiseases', { symptomps, id, error })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static postAddDiseases(req, res) {
        const { name, description, imageUrl, drug } = req.body
        Disease.create({name, description, imageUrl, drug, UserId: 1})
            .then(result => {
                return result.addSymptomps(req.body.SymptompId)
            })
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                if (err.name == "SequelizeValidationError") {
                    let theError = err.errors.map(el => {
                        return el.message
                    })
                    res.redirect(`/addDiseases?error=${theError}`)
                }
                console.log(err)
            })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if(err) res.send(err)
            else{
                res.redirect("/login")
            }
        })
    }

    static deleteDisease(req, res) {
        const id = req.params.diseasesId;
      
        Disease.findByPk(id)
          .then((disease) => {
            if (!disease) {
              throw new Error('Disease not found');
            }
            return DiseaseSymptomp.destroy({
              where: { DiseaseId: disease.id },
            }).then(() => disease.destroy());
          })
          .then(() => {
            res.redirect('/');
          })
          .catch((err) => {
            console.log(err);
            res.send(err);
          });
      }
}

module.exports = Controller