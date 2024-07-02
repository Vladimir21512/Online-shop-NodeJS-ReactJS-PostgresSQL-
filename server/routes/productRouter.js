const Router = require('express')
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/', checkRole('ADMIN'),productController.create)

router.post('/:dd/del', checkRole('ADMIN'), productController.delete)
router.post('/:id/delcomm', checkRole('ADMIN'), productController.deleteComm)

router.get('/', productController.getAll)
router.get('/all', productController.get)

router.get('/premium', productController.getAllPremium)

router.get('/:id', productController.getOne)
router.get('/info/:id', productController.getOneInfo)

router.post('/:id/add', authMiddleware, productController.addProductToBasket)
router.post('/:id/addcomm', authMiddleware, productController.addComment)

router.get('/:id/getcomm', productController.getComments)



router.get('/category_brand/:category/:sexId', productController.getCategoryBrand)
router.get('/category_season/:category/:sexId', productController.getCategorySeason)
router.get('/category_category/:category/:sexId', productController.getCategory)

router.post('/banUser', checkRole('ADMIN'), productController.banUser)

router.post('/sex', productController.createSex)


module.exports = router