const uuid = require('uuid')
const path = require('path')
const jwt = require('jsonwebtoken')
const {Product, BasketProduct, Basket, Comment, Categories, User, Brand, Material, Size, ProductInfo, Sex} = require('../models/models')
const { Op } = require('sequelize');

const ApiError = require('../error/ApiError')

class ProductController{
    async create(req,res, next)
    {
        
        try{
            const {name, price, brandId, materialId, categoryId, type, description, info_1, sexId} = req.body
            const {img} = req.files
            console.log(req.files)
            let filename = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname,'..', 'static', filename))

            let img_array =[]
            for (var key in req.files) {
                //let str = key.replace('color','').replace('_img','')
                //img_array.push(str)
                img_array.push(key)
            }
            
            const product = await Product.create({name, price, materialId, brandId, categoryId, type, description, img:filename, sexId})

            for (var i=0;i<JSON.parse(info_1).length;i++)
            {
                const obj = JSON.parse(info_1)[i]
                const color = obj.color
                const sizes = obj.sizes
                const hex = obj.hex
                const next_val = i+1

                //массив с названиями картинок из req.files для текущего цвета
                let req_file_img = []

                let filename1=null
                let filename2=null
                let filename3=null
                let filename4=null
                let filename5=null

                for (let index = 0; index < img_array.length; index++) {
                    if(img_array[index].substring(5,6)==next_val){
                        req_file_img.push(img_array[index])
                    }
                }
                if(req_file_img.includes('color'+next_val+'_img1')){
                    console.log(req.files['color'+next_val+'_img1'])
                    filename1 = uuid.v4() + '.jpg'
                    req.files['color'+next_val+'_img1'].mv(path.resolve(__dirname,'..', 'static', filename1))
                }
                if(req_file_img.includes('color'+next_val+'_img2')){
                    filename2 = uuid.v4() + '.jpg'
                    req.files['color'+next_val+'_img2'].mv(path.resolve(__dirname,'..', 'static', filename2))
                }
                if(req_file_img.includes('color'+next_val+'_img3')){
                    filename3 = uuid.v4() + '.jpg'
                    req.files['color'+next_val+'_img3'].mv(path.resolve(__dirname,'..', 'static', filename3))
                }
                if(req_file_img.includes('color'+next_val+'_img4')){
                    filename4 = uuid.v4() + '.jpg'
                    req.files['color'+next_val+'_img4'].mv(path.resolve(__dirname,'..', 'static', filename4))
                }
                if(req_file_img.includes('color'+next_val+'_img5')){
                    filename5 = uuid.v4() + '.jpg'
                    req.files['color'+next_val+'_img5'].mv(path.resolve(__dirname,'..', 'static', filename5))
                }
                const product_inf = await ProductInfo.create({color, sizes, hex, img1:filename1, img2:filename2, img3:filename3, img4:filename4, img5:filename5, productId:product.id})
            }
            
            return res.json({product})
        }
        catch(err)
        {
            next(ApiError.badRequest(err.message))
        }
    }
    async delete(req,res){
        const {dd} = req.params
        const product_delete = await Product.destroy({where: {id:dd}})
        return res.json({product_delete})
    }

    async deleteComm(req,res){
        const {id} = req.params
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        

        //ID пользователя
        const ID = decode.id
        let del_comm
        if(decode.role!='ADMIN'){
           
            del_comm = await Comment.destroy({where:{userId:ID, id}})
        }
        else{
            del_comm = await Comment.destroy({where:{id}})
        }
        return res.json(del_comm)
    }


    async get(req,res){
        const all_prod = await Product.findAll()
        return res.json(all_prod)
    }

    async getAll(req,res)
    {
        let {categoryId, brandId, materialId, order, limit,page, start, finish} = req.query
        page=page || 1
        limit = limit || 9

        let offset = page * limit - limit

        let products;
        
        console.log(start,finish)
        if(start==undefined || start.trim()=="" || start==null ){
            page = 1
            start = 1
        }
        if(finish==undefined || finish.trim()=="" || finish==null){
            finish=10000000
        }

        products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}}, order: ['price'], limit, offset})
        // if(order!=undefined){
        //     if(order=='up'){
        //         if(!categoryId && !brandId && !materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}}, order: ['price'], limit, offset})
        //         }
        //         if(categoryId && !brandId && !materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{categoryId}, limit, offset})
        //         }
        //         if(!categoryId && brandId && !materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{brandId}, limit, offset})
        //         }
        //         if(!categoryId && !brandId && materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{materialId}, limit, offset})
        //         }
        //         if(!categoryId && !brandId && !materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{sizeId}, limit, offset})
        //         }


        //         if(categoryId && brandId && !materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{categoryId, brandId}, limit, offset})
        //         }
        //         if(!categoryId && brandId && materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{brandId, materialId}, limit, offset})
        //         }
        //         if(!categoryId && !brandId && materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{sizeId, materialId}, limit, offset})
        //         }


        //         if(categoryId && !brandId && materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{materialId, categoryId}, limit, offset})
        //         }
        //         if(!categoryId && brandId && !materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{brandId, sizeId}, limit, offset})
        //         }
        //         if(categoryId && !brandId && !materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{sizeId, categoryId}, limit, offset})
        //         }


        //         if(categoryId && !brandId && materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{materialId, categoryId, sizeId}, limit, offset})
        //         }
        //         if(!categoryId && brandId && materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{materialId, brandId, sizeId}, limit, offset})
        //         }
        //         if(categoryId && brandId && !materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{categoryId, brandId, sizeId}, limit, offset})
        //         }
        //         if(categoryId && brandId && materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{categoryId, brandId, materialId}, limit, offset})
        //         }

        //         if(categoryId && brandId && materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({where:{ type:'default', price:{[Op.between]:[start,finish]}},order: ['price'], where:{categoryId, brandId, sizeId, materialId}, limit, offset})
        //         }
        //     }
        //     if(order=='down'){
        //         if(!categoryId && !brandId && !materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({ order: [['price', 'DESC']], limit, offset, where:{price:{[Op.between]:[start,finish]}}})
        //         }
        //         if(categoryId && !brandId && !materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{categoryId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }
        //         if(!categoryId && brandId && !materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{brandId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }
        //         if(!categoryId && !brandId && materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{materialId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }
        //         if(!categoryId && !brandId && !materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{sizeId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }


        //         if(categoryId && brandId && !materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{categoryId, brandId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }
        //         if(!categoryId && brandId && materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{brandId, materialId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }
        //         if(!categoryId && !brandId && materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{sizeId, materialId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }


        //         if(categoryId && !brandId && materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{materialId, categoryId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }
        //         if(!categoryId && brandId && !materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{brandId, sizeId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }
        //         if(categoryId && !brandId && !materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{sizeId, categoryId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }


        //         if(categoryId && !brandId && materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{materialId, categoryId, sizeId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }
        //         if(!categoryId && brandId && materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{materialId, brandId, sizeId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }
        //         if(categoryId && brandId && !materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: ['price'], where:{categoryId, brandId, sizeId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }
        //         if(categoryId && brandId && materialId && !sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{categoryId, brandId, materialId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }

        //         if(categoryId && brandId && materialId && sizeId)
        //         {
        //             products = await Product.findAndCountAll({order: [['price', 'DESC']], where:{categoryId, brandId, sizeId, materialId, price:{[Op.between]:[start,finish]}}, limit, offset})
        //         }
        //     }
        // }
        // else{
        //     if(!categoryId && !brandId && !materialId && !sizeId)
        //     {
        //         products = await Product.findAndCountAll({ where:{type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
        //     if(categoryId && !brandId && !materialId && !sizeId)
        //     {
        //         products = await Product.findAndCountAll({ where:{categoryId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
        //     if(!categoryId && brandId && !materialId && !sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{brandId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
        //     if(!categoryId && !brandId && materialId && !sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{materialId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
        //     if(!categoryId && !brandId && !materialId && sizeId)
        //     {
        //         products = await Product.findAndCountAll({ where:{sizeId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }


        //     if(categoryId && brandId && !materialId && !sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{categoryId, brandId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
        //     if(!categoryId && brandId && materialId && !sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{brandId, materialId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
        //     if(!categoryId && !brandId && materialId && sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{sizeId, materialId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }


        //     if(categoryId && !brandId && materialId && !sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{materialId, categoryId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
        //     if(!categoryId && brandId && !materialId && sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{brandId, sizeId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
        //     if(categoryId && !brandId && !materialId && sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{sizeId, categoryId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }


        //     if(categoryId && !brandId && materialId && sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{materialId, categoryId, sizeId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
        //     if(!categoryId && brandId && materialId && sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{materialId, brandId, sizeId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
        //     if(categoryId && brandId && !materialId && sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{categoryId, brandId, sizeId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
        //     if(categoryId && brandId && materialId && !sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{categoryId, brandId, materialId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }

        //     if(categoryId && brandId && materialId && sizeId)
        //     {
        //         products = await Product.findAndCountAll({where:{categoryId, brandId, sizeId, materialId, type:'default', price:{[Op.between]:[start,finish]}}, limit, offset})
        //     }
            
        // }
        return res.json(products)
    }
    async getAllPremium(req,res)
    {
     
        let products = await Product.findAll({where:{type:'premium'}});  
        console.log(products)
        return res.json(products)
    }
    async getOne(req,res)
    {
        const {id} = req.params
        const product = await Product.findOne({
            where: {id}
        })
        return res.json(product)
    }
    async getOneInfo(req,res)
    {
        const {id} = req.params
        const product = await ProductInfo.findAll({
            where: {productId:id}
        })
        return res.json(product)
    }
    async addProductToBasket(req, res){

        const token = req.headers.authorization.split(' ')[1]

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        const ID = decode.id

        let basket = await Basket.findOne({where:{userId:ID}})

        //ПОЛУЧЕНИЕ ID ТОВАРА КОТОРЫЙ СОБИРАЕМСЯ ДОБАВИТЬ В КОРЗИНУ
        const {id} = req.params

        console.log(basket.id, id)

        const basket_product = await BasketProduct.create({basketId: basket.id, productId: id})
        //const basket_product = await BasketProduct.create()
        return res.json(basket_product)
    }
    async addComment(req,res){

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.SECRET_KEY)

        //ID пользователя
        const ID = decode.id
        const user_name = decode.name

        const {id}=req.params

        const check = await Comment.findOne({where:{userId:ID, productId:id}})
        if(check==null){
            const user_img = decode.img

            const {desc} = req.body
            var today = new Date()
            var now = today.toLocaleString()

            console.log(req.body)
            let comment = await Comment.create({title: user_name, description: desc, time:now, userId: decode.id, productId: id, userImg:user_img})

            return res.json({comment})
        }
        else{
            return res.json({check})
        }
    }
    async getComments(req,res){
        const {id} = req.params
        const comments = await Comment.findAll({
            where: {productId:id}
        })
        return res.json(comments)
    }



    async getCategoryBrand(req,res){
        const {category,sexId} = req.params
        const category_filtered = await Brand.findOne({where:{name:category}})

        console.log(category_filtered)

        const products = await Product.findAll({
             where: {categoryId:category_filtered.id, sexId}
        })
        return res.json(products)
    } 
   
    async getCategory(req,res){
        const {category, sexId} = req.params
        const category_filtered = await Categories.findOne({where:{name:category}})

        console.log(category_filtered)

        const products = await Product.findAll({
             where: {categoryId:category_filtered.id, sexId}
        })
        return res.json(products)
    } 
    async getCategorySeason(req,res){
        const {category, sexId} = req.params
        const category_filtered = await Material.findOne({where:{name:category}})

        console.log(category_filtered)

        const products = await Product.findAll({
             where: {materialId:category_filtered.id, sexId}
        })
        return res.json(products)
    } 



    async banUser(req,res){
        const {userId} = req.body

        const user = await User.update({isBanned:true},{where:{id:userId}} )
        return res.json(user)
    }
    async createSex(req,res){
        const {name}=req.body
        const sex = await Sex.create({name})
        return res.json({sex})
    }
}

module.exports = new ProductController()