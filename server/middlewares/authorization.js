module.exports = {
    isAuthorized: (req,res,next) => {
        try {
            if(req.decoded._id === req.body.id) {
                next()
            }
        }
        catch {
            res.status(403).json({
                message: "gagal authorisasi, token tidak tersedia"
            })
        }
    }
}