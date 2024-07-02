const Router = require('express')
const router = new Router()
const materialController = require('../controllers/materialController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'),materialController.create)
router.get('/', materialController.getAll)

module.exports = router