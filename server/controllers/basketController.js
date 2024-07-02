const {BasketProduct, Basket, Product, User} = require('../models/models')
const jwt = require('jsonwebtoken')

class BasketController{

    async getAll(req, res){

        // let basket_product = await BasketProduct.findAll()
        // return res.json(basket_product)
        const token = req.headers.authorization.split(' ')[1]

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        const ID = decode.id

        let basket = await Basket.findOne({where:{userId:ID}})

        let basket_product = await BasketProduct.findAll({where:{basketId:basket.id}, include:Product})
        return res.json(basket_product)
    }

    async deleteProduct(req, res){
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const {ID} = req.body

        let delProd = await BasketProduct.destroy({
            where:{id:ID}
        })

        return res.json(delProd)
    }

    async checkProduct(req,res){
        const token = req.headers.authorization.split(' ')[1]

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        const ID = decode.id

        const {id} = req.params

        let basket = await Basket.findOne({where:{userId:ID}})

        let basket_product = await BasketProduct.findAll({where:{basketId:basket.id}})

        // let RES = basket_product.find(e=> e.productId==id)
        let RES = basket_product.find(e=> e.productId==id)
        return res.json(RES)
    }
    async checkOneProduct(req,res){
        const token = req.headers.authorization.split(' ')[1]

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        const ID = decode.id

        const {id} = req.params

        let basket = await Basket.findOne({where:{userId:ID}})

        let basket_product = await BasketProduct.findAll({where:{basketId:basket.id}})

        return res.json(basket_product)
    }
}

module.exports = new BasketController()