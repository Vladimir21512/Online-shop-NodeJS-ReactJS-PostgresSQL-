const Router = require('express')
const router = new Router()
const colorController = require('../controllers/colorController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', colorController.create)
router.get('/', colorController.getAll)

module.exports = router