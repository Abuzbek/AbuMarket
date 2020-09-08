const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Products = new Schema({
    name:String,
    description:String,
    img:String,
    imb_score:Number,
    category:String,
    money:String,
    feature:String,
    sale:String,
    
})
module.exports = mongoose.model('product',Products)