const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, allowNull:false},
    isBanned:{type: DataTypes.BOOLEAN, allowNull:false,defaultValue:false},
    email: {type: DataTypes.STRING, unique:true},
    password:{type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull:true},
    role:{type: DataTypes.STRING, defaultValue: 'USER'},
    uuid:{type: DataTypes.STRING, unique:true},
    isActive:{type: DataTypes.BOOLEAN, allowNull:false, defaultValue:false}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull:false},
    materialId: {type: DataTypes.INTEGER, allowNull:false},
    brandId: {type: DataTypes.INTEGER, allowNull:false},
    img: {type: DataTypes.STRING, allowNull:false},
    categoryId: {type: DataTypes.INTEGER, allowNull:false},
    type:{type: DataTypes.STRING, allowNull:false},
    price: {type: DataTypes.INTEGER, allowNull:false},
    description: {type: DataTypes.STRING, allowNull:false}
})

const ProductInfo= sequelize.define('productInfoColor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    color:{type: DataTypes.STRING, allowNull:false},
    sizes:{type: DataTypes.STRING, allowNull:false},
    hex:{type: DataTypes.STRING, allowNull:false},
    img1:{type: DataTypes.STRING, allowNull:true},
    img2:{type: DataTypes.STRING, allowNull:true},
    img3:{type: DataTypes.STRING, allowNull:true},
    img4:{type: DataTypes.STRING, allowNull:true},
    img5:{type: DataTypes.STRING, allowNull:true}
})

const Color = sequelize.define('color', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false},
    hex:{type: DataTypes.STRING, allowNull:false}
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title: {type: DataTypes.STRING, allowNull:false},
    time: {type: DataTypes.STRING, allowNull:false},
    userImg:{type: DataTypes.STRING, allowNull:false},
    description:{type: DataTypes.STRING, allowNull:false},
})

const Messages = sequelize.define('messages', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    text: {type: DataTypes.STRING, allowNull:false},
})

const Material = sequelize.define('material', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, allowNull:false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, allowNull:false},
})

const Size = sequelize.define('size', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, allowNull:false},
})

const Categories = sequelize.define('categories', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, allowNull:false},
})

const Sex = sequelize.define('sex', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, allowNull:false},
})

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    user_email: {type: DataTypes.STRING, allowNull:false},
    product_name: {type: DataTypes.STRING, allowNull:false},
    product_price: {type: DataTypes.STRING, allowNull:false},
    size: {type: DataTypes.STRING, allowNull:false},
    color: {type: DataTypes.STRING, allowNull:false},
    FIO: {type: DataTypes.STRING, allowNull:false},
    phone_number: {type: DataTypes.STRING, allowNull:false},
    city: {type: DataTypes.STRING, allowNull:false},
    street: {type: DataTypes.STRING, allowNull:false},
})

const Activated = sequelize.define('activated',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    userId: {type: DataTypes.INTEGER, allowNull:false},
    activationLink:{type: DataTypes.STRING, allowNull:false},
    active: {type: DataTypes.BOOLEAN, allowNull:false},
})
const ProductColor = sequelize.define('product_color', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

Sex.hasMany(Product)
Product.belongsTo(Sex)

User.hasOne(Activated)
Activated.belongsTo(User)

User.hasMany(Messages)
Messages.belongsTo(User)

User.hasMany(Orders)
Orders.belongsTo(User)

Product.hasMany(Orders)
Orders.belongsTo(Product)


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Product.hasMany(Comment)
Comment.belongsTo(Product)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Material.hasMany(Product)
Product.belongsTo(Material)

// Size.hasMany(Product)
// Product.belongsTo(Size)

Categories.hasMany(Product)
Product.belongsTo(Categories)

Color.belongsToMany(Product, {through: ProductColor })
Product.belongsToMany(Color, {through: ProductColor })

module.exports = {
    User, Basket, BasketProduct, Product, Comment, Messages, Material, Brand, Size, Categories, Orders, Activated, Color, ProductInfo, Sex
}