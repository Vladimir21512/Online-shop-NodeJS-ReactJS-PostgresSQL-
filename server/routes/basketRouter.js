const Router = require('express')
const basketController = require('../controllers/basketController')
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()


router.get('/', authMiddleware, basketController.getAll)
router.get('/checkProduct/:id', authMiddleware, basketController.checkProduct)

router.get('/checkOneProduct', authMiddleware, basketController.checkOneProduct)

router.post('/del', authMiddleware, basketController.deleteProduct)

module.exports = router