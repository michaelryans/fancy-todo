const jwt = require('jsonwebtoken')

module.exports = {
    jwtEncrypt: function (input) {
        const server_token = jwt.sign(input, process.env.JWT_TOKEN, {expiresIn:"15m"})
        return server_token
    },
    jwtVerify: function (token_input) {
        const decoded = jwt.verify(token_input, process.env.JWT_TOKEN)
        return decoded
    }    
}