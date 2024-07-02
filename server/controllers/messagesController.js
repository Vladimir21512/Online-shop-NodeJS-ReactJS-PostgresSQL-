const {Messages} = require('../models/models')

class MessagesController{
    async getAll(req,res){
        let messages = await Messages.findAll()
        return res.json({messages})
    }
    async addMessage(req,res){
        let {text_} = req.body
        const new_mess = await Messages.create({text: text_})
        return res.json({new_mess})
    }
}

module.exports = new MessagesController()