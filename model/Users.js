const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Users = new Schema({
    username:String,
    surname:String,
    email:String,
    password:String,
    number:String,
})
module.exports = mongoose.model('user' , Users)