const User = require('../models/user')
const {jwtVerify} = require('../helpers/jwt')

module.exports = {
    isLogin: (req,res,next)=> {
            if(req.headers.token) {
                try {
                    const decoded = jwtVerify(req.headers.token)

                    User.findOne({_id:decoded._id})
                    .then(found => {
                        console.log(found.length)
                        // if(found.name == decoded.name && found.email == decoded.email) {
                            req.decoded = decoded
                            next()           
                        // }
                    })
                }
                catch {
                    res.status(403).json('gagal cek database')
                }
            } else {
            res.status(403).json({
                message: "gagal autentifikasi, token tidak tersedia"
            })
        }
    }
}