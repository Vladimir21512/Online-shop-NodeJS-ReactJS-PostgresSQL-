const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, Activated} = require('../models/models')
const {validationResult } = require('express-validator'); 
const mailService = require('./mailService')
const newPassMail = require('./newPassMail')

const generatePassword = require('password-generator')

const generateJwt = (id, email, role, name, img, isBanned, isActive)=>{
    return jwt.sign({id, email, role, name, img, isBanned, isActive}, 
        process.env.SECRET_KEY,
        {
            expiresIn: '10d'
        }
    )
}

class UserController{
    async registration(req, res, next)
    {
        const errors = validationResult(req); 

        console.log(errors)
 
        if (errors.isEmpty()) { 
        const {email, password, role, name} = req.body

        let filename = null
        if(req.files){
            const {img} = req.files
            filename = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname,'..', 'static', filename))
        }
       


        if (!email || !password){
            return next(ApiError.badRequest('Неверный email или пароль!'))
        }
        else if(!name){
            return next(ApiError.badRequest('Укажите имя!'))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate)
        {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        

        const hashPassword = await bcrypt.hash(password, 5)

        const activationLink = uuid.v4()


        let user
        if((email==process.env.ADMIN1_MAIL && password==process.env.ADMIN1_PASS) || (email==process.env.ADMIN2_MAIL && password==process.env.ADMIN2_PASS)){
            if(filename!=null){
            user = await User.create({email,role,password:hashPassword, name, img:filename, role:"ADMIN", uuid:activationLink, isActive:true})
            }
            else{
                user = await User.create({email,role,password:hashPassword, name, img:'User.png', role:"ADMIN", uuid:activationLink, isActive:true})
            }
        }
        else{
            if(filename!=null){
                user = await User.create({email,role,password:hashPassword, name, img:filename, uuid:activationLink})
                await mailService.sendEmail(email, process.env.API_URL+'api/user/activate/'+activationLink)
            }
            else{
                user = await User.create({email,role,password:hashPassword, name, img:'User.png', uuid:activationLink})
                await mailService.sendEmail(email, process.env.API_URL+'api/user/activate/'+activationLink)
            }
        } 


        const basket = await Basket.create({userId: user.id})

        const tok = generateJwt(user.id, user.email, user.role, user.name, user.img, user.isBanned, user.isActive)

        return res.json({token: tok})
        }
        else{
            return res.json({errors})
        }
    }
    async login(req, res, next)
    {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('Неверно указаны данные'))
        } 
        let compareSync = bcrypt.compareSync(password, user.password)
        if(!compareSync){
            return next(ApiError.internal('Неверно указаны данные'))
        }
        const tok = generateJwt(user.id, user.email, user.role, user.name, user.img, user.isBanned, user.isActive)
        console.log(tok)
        return res.json({token: tok})
    }
    async check(req, res, next)
    {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name, req.user.img, req.user.isBanned, req.user.isActive)
        return res.json({token})
    }
    async checkBan(req,res){
        const {id}=req.params
        const user = await User.findOne({where:{id}})
        if(user.isBanned==true){
            return res.json({message:true})
        }
        else{
            return res.json({message:false})
        }
    }
    async newLink(req,res){
        const activationLink = uuid.v4()
        const {email} = req.body

        const user = await User.update({uuid:activationLink},{where:{email}} )

        await mailService.sendEmail(email, process.env.API_URL+'api/user/activate/'+activationLink)
    }
    async activate(req,res, next){
        try{
            const {link} = req.params
            console.log(link)
            const user = await User.findOne({where:{uuid:link}})
            if(!user){
                throw new Error('Некорректная ссылка активации!')
            }
            const userActive = await User.update({isActive:true}, {where:{uuid:link}})
            
            return res.redirect(process.env.CLIENT_URL+'access')
            //return res.json({userActive})
        }
        catch(e){
            console.log(e)
        }
    }
    async newPassword(req,res){
        const {email} = req.body
        const pass = generatePassword(12, false)

        const user = await User.findOne({where:{email}})
        if(!user){
            return res.json({message:'Пользователь не найден'})
        }

        const hashPassword = await bcrypt.hash(pass, 5)

        const userUpdate = await User.update({password:hashPassword}, {where:{email}})

        newPassMail.sendEmail(email, pass)
        return res.json(userUpdate)
    }
    
}

module.exports = new UserController()
