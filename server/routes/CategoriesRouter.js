const Router = require('express')
const router = new Router()
const CategoriesController = require('../controllers/categoriesController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'),CategoriesController.create)
router.get('/', CategoriesController.getAll)

module.exports = router