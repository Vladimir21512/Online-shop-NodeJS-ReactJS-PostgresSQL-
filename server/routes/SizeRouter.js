const Router = require('express')
const router = new Router()
const sizeController = require('../controllers/sizeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'),sizeController.create)
router.get('/', sizeController.getAll)

module.exports = router