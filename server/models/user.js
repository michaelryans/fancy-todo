const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    email:String,
    name: String,
    image: String,
    password:String,
    role:String,
})

const User = mongoose.model('User', userSchema)

module.exports = User