const User = require('../models/user')

class UserController {
    static create(req,res) {
        User.create({
            email:req.body.email,
            password:req.body.password
        })
        .then(user_created => {
            res.status(201).json(user_created)
        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message: "gagal create user"
            })
        })
    }    
}


module.exports = UserController