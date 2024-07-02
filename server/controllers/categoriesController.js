const {Categories} = require('../models/models')

class CategoriesController{
    async create(req,res){
        const {name} = req.body
        const categorie = await Categories.create({name})
        return res.json({categorie})
    }
    async getAll(req,res){
        const categories = await Categories.findAll()
        return res.json({categories})
    }
}

module.exports = new CategoriesController()