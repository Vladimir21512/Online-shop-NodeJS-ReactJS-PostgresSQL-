const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

const {body} = require('express-validator');

router.post('/registration', [body('email').isEmail()], userController.registration)

router.post('/login', userController.login)
router.get('/auth', authMiddleware ,userController.check)
router.get('/checkBan/:id', authMiddleware ,userController.checkBan)

router.post('/newLink', userController.newLink)
router.get('/activate/:link', userController.activate)

router.post('/pass', userController.newPassword)

module.exports = router