require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


class UserController {
    static create(req,res) {
        User.create({
            email:req.body.email,
            password:req.body.password,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 10)
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
    
    static googleLogin(req,res) {
        const CLIENT_ID = process.env.CLIENT_ID
        const token = req.body.token
        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client(CLIENT_ID);

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();

            User.findOne({email:payload.email})
            .then(data => {
                //put password randomizer later
                if(!data) {
                    const random = Math.random().toString(36).substring(2, 15)
                    console.log('masuk create user dari google sign in')
                    User.create({
                        id: payload.sub,
                        name: payload.name,
                        email: payload.email,
                        password: 'hahahhaa nanti di hash',
                        image: payload.image,
                        role:"user"
                    })
                    .then(created => {
                        console.log('sign in google - data created')
                        const server_token = jwt.sign({
                            name:created.name,
                            email:created.email,
                            role:created.role
                        }, process.env.JWT_TOKEN)

                        res.status(201).json({
                            token:server_token,
                            name:created.name,
                            message:"google sign in success"
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err,
                            message: "gagal create user - google sign in"
                        })
                    })
                } else {
                    console.log('data ada')
                    const server_token = jwt.sign({
                        name:data.name,
                        email:data.email,
                        role:data.role
                    }, process.env.JWT_TOKEN)

                    res.status(201).json({
                        token:server_token,
                        name:data.name,
                        message:"google sign in success"
                    })
                }
            })
        })
    }

    static login(req,res) {
        User.findOne({email:req.body.email})
        .then(found => {
            if(found) {
                bcrypt.compareSync(req.body.password, found.password)
                const server_token = jwt.sign({
                    email:found.email,
                    name:found.name,
                    role:found.role
                }, process.env.JWT_TOKEN)
                
                res.status(200).json({
                    token:server_token,
                    message:"login success"
                })
            }
        })
        .catch(err => {
            res.status(401).json({
                error: err,
                message:"wrong email/password"
            })
        })
    }
}


module.exports = UserController