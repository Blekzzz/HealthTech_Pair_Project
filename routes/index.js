const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

router.get('/', Controller.home)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)
router.get('/login', Controller.login)
router.post('/login', Controller.postLogin)

module.exports = router