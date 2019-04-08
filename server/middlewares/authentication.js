const jwt = require('jsonwebtoken')

module.exports = {
    isLogin: (req,res,next)=> {
            if(req.headers.token) {
                const decoded = jwt.verify(req.headers.token, process.env.JWT_TOKEN)
                req.decoded = decoded
                //console.log(decoded)
    
                next()
            } else {
            res.status(403).json({
                message: "gagal autentifikasi, token tidak tersedia"
            })
        }
    }
}