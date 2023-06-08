const { User } = require('../models')
const bcrypt = require('bcryptjs')

class Controller {
    static home(req, res) {
        res.render('home')
    }

    static register(req, res) {
        res.render('registerPage')
    }

    static postRegister(req, res) {
        const { username, email, password, role } = req.body
        // console.log(req.body)
        User.create(req.body)
            .then(newUser => {
                res.redirect('/login')
            })
            .catch(err => {
                res.send(err)
                console.log(err)
            })
    }

    static login(req, res) {
        res.render('loginPage')
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
                    return res.redirect('/')
                } else {
                    const errors = 'Invalid username or password, please input the right one!!'
                    return res.redirect(`/login?errors=${errors}`)
                }
            })
            .catch(err => {
                res.send(err)
                console.log(err)
            })
    }

}

module.exports = Controller