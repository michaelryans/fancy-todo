const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    email: {
        type:String,
        required:[true, "email is requiresd"],
        validate: [{
            validator: function(email) {
                return User.find({
                    email:email
                })
                .then(found => {
                    if(found.length >= 1) return false;
                })
            },
            message: "The email entered is registered, please enter another email"
        },{
            validator: function(email) {
                const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return email_regex.test(email)
            },
            message: "Please enter valid email"
        }],
    },
    name: String,
    image: String,
    password:{
        type:String,
        required: [true, "password is required"],
    },
    role:String,
})

const User = mongoose.model('User', userSchema)

module.exports = User