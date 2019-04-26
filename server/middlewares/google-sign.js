module.exports = {
    googleVerify: (req,res,next) => {
        const CLIENT_ID = process.env.CLIENT_ID
        const token = req.body.token
        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client(CLIENT_ID);

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            req.payload = payload
            console.log(payload)
            next()
        })
        .catch(err => {
            res.json({
                error:err,
                message: "gagal verifikasi google token"
            })
        })
    }
}