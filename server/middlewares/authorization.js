const Task = require('../models/task')


module.exports = {
    isAuthorized: (req,res,next) => {
        try {
            Task.findOne({
                _id:req.params.id
            })
            .then(found => {
                if(found.user == req.decoded._id) {
                    next()
                }
            })
        }
        catch {
            res.status(403).json({
                message: "gagal authorisasi"
            })
        }
    }
}