const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const MessagesController = require('../controllers/messagesController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', MessagesController.getAll)
router.post('/message_add', checkRole('ADMIN'), MessagesController.addMessage)

module.exports = router