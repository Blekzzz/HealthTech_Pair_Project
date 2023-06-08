const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

// router.use((req, res, next) => {
//     if (!req.session.userId) {
//         next()
//     } else {
//         res.redirect('/login')
//     }
// })

router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)
router.get('/login', Controller.login)
router.post('/login', Controller.postLogin)
router.get('/logout', Controller.logout)

router.use((req, res, next) => {
    if (req.session.userId) {
        next()
    } else {
        const error = 'please login first'
        res.redirect(`/login?error=${error}`)
    }
})

router.get('/', Controller.home)
router.get('/diseases/:diseasesId', Controller.detailDiseases)

router.get('/medicalHistories/:userId', Controller.medicalHistory)
router.post('/medicalHistories/:userId', Controller.postMedicalHistory)
router.post('/medicalHistoriesUpdate/:userId', Controller.postUpdateMedicalHistory)
router.get('/addDiseases', Controller.addDiseases)
router.post('/addDiseases', Controller.postAddDiseases)
router.get('/delete/:diseasesId', Controller.deleteDisease)



module.exports = router