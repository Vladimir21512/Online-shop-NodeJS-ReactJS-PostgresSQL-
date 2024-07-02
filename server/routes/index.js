const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const basketRouter = require('./basketRouter')
const messagesRouter = require('./messagesRouter')

const materialRouter = require('./MaterialRouter')
const brandRouter = require('./brandRouter')
const sizeRouter = require('./SizeRouter')
const categoriesRouter = require('./CategoriesRouter')

const orderRouter = require('./orderRouter')

const colorRouter = require('./colorRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/messages', messagesRouter)
router.use('/basket', basketRouter)

router.use('/material', materialRouter)
router.use('/brand', brandRouter)
router.use('/size', sizeRouter)
router.use('/categories', categoriesRouter)

router.use('/order', orderRouter)

router.use('/color', colorRouter)

module.exports = router