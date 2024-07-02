const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', orderController.create)
router.get('/', orderController.getAll)
router.get('/:id', orderController.checkOne)

module.exports = router