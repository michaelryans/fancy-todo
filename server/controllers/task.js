const Task = require('../models/task')

class TaskController {
    static create(req,res) {
        Task.create({
            user: req.body.user, //change later and models res
            name: req.body.name,
            description: req.body.description,
            status: false,
            dueDate: new Date()
        })
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            res.status(500).json({
                message : 'task create failed',
                err: err
            })
        }) 
    }
}

module.exports = TaskController