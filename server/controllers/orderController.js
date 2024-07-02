const {Orders, Product} = require('../models/models')
const orderMail = require('./orderMail')
const jwt = require('jsonwebtoken')

class OrdersController{
    async create(req,res){
        const {userId, user_email,productId, product_name, product_price, FIO, phone_number, city, street, size, color} = req.body

        const ord = await Orders.create({userId, user_email, productId, product_name, product_price, FIO, phone_number, city, street, size,color})
        const ord_obj = {"userId":userId, "email":user_email, "productId":productId, "product_name": product_name, "product_price":product_price, "FIO":FIO, "phone_number":phone_number, "city":city, "street":street, "size": size, "color":color}
        await orderMail.sendEmail(ord_obj )
        return res.json({ord})
    }
    async getAll(req,res){
        const token = req.headers.authorization.split(' ')[1]

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        //id пользователя
        const ID = decode.id

        //const orders = await Orders.findAll({where:{userId:ID}})
        const orders = await Orders.findAll({where:{userId:ID}, include: Product})
        return res.json(orders)
    }
    async checkOne(req,res){
        const {id} = req.params
        const orders = await Orders.findOne({where:{productId:id}})
        return res.json(orders)
    }
}

module.exports = new OrdersController()