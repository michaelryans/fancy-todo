require('dotenv').config()
const User = require('../models/user')
const {jwtEncrypt} = require('../helpers/jwt')
const {bcryptHashSync} = require('../helpers/bcrypt')
const {bcryptCompareSync} = require('../helpers/bcrypt')


class UserController {
    static create(req,res) {
        User.create({
            email:req.body.email,
            password:req.body.password,
            name: req.body.name,
            password: bcryptHashSync(req.body.password)
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
        const payload = req.payload
        User.findOne({email:payload.email})
        .then(data => {
            //put password randomizer later
            if(!data) {
                const random = Math.random().toString(36).substring(2, 15)
                //console.log('masuk create user dari google sign in')
                User.create({
                    id: payload.sub,
                    name: payload.name,
                    email: payload.email,
                    password: bcryptHashSync(random),
                    image: payload.image,
                    role:"user"
                })
                .then(created => {
                    //console.log('sign in google - data created')
                    const data_token = {
                        _id:created._id,
                        name:created.name,
                        email:created.email,
                        role:created.role
                    }
                    const server_token = jwtEncrypt(data_token)

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
                //console.log('data ada')
                const data_token = {
                    _id:data._id,
                    name:data.name,
                    email:data.email,
                    role:data.role
                }
                const server_token = jwtEncrypt(data_token)
                res.status(200).json({
                    token:server_token,
                    name:data.name,
                    message:"google sign in success"
                })
            }
        })
    }

    static login(req,res) {
        // console.log(`ini reqbody`)
        // console.log(req.body)
        User.findOne({email:req.body.email})
        .then(found => {
            // console.log('masuk try lhoo')
            const loggedIn = bcryptCompareSync(req.body.password, found.password)
            if(loggedIn) {
                console.log(found)
                const data_token = {
                    _id:found._id,
                    email:found.email,
                    name:found.name,
                    role:found.role
                }
                const server_token = jwtEncrypt(data_token)
                //console.log('server token')
                //console.log(server_token)
                res.status(200).json({
                    name:found.name,
                    token:server_token,
                    message:"login success"
                })
            } else {
                res.status(401).json("wrong credentials")
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