const {Color} = require('../models/models')

class ColorController{
    async create(req,res){
        const {name, hex} = req.body
        console.log('name and hex:')
        console.log(name,hex)
        const color = await Color.create({name, hex})
        return res.json({color})
    }
    async getAll(req,res){
        const colors = await Color.findAll()
        return res.json({colors})
    }
}

module.exports = new ColorController()