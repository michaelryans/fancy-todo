const Task = require('../models/task')

class TaskController {
    static create(req,res) {
        if(!req.body.date) {
            let date = new Date();
            //add 1 day
            date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
            req.body.date = date
        }

        Task.create({
            user: req.decoded._id, //change later and models res
            name: req.body.name,
            description: req.body.description,
            status: false,
            dueDate: req.body.date,
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

    static findAll(req,res) { //will return all task specific to the user
        if(!req.decoded._id) {
            res.status(403).json("token tidak ada")
        } else {
            Task.find({
                user: req.decoded._id
            })
            .then(found => {
                res.status(200).json(found)
            })
            .catch(err => {
                res.status(500).json({
                    message: "get task data failed",
                    err:err
                })
            })
        }
    }

    static updateStatus(req,res) {
        Task.findOneAndUpdate({
            _id:req.params.id
        }, {status:req.body.status}, {new:true})
        .then(updated => {
            res.status(200).json({
                updated:updated,
                message:`Status updated!`
            })
        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message:"update status failed"
            })
        })
    }
    static deleteTask(req,res) {
        Task.findOneAndDelete({_id:req.params.id})
        .then(deleted => {
            res.status(200).json({
                deleted:deleted,
                _id:req.params.id,
                message:`successfully deleted`
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "error delete task"
            })
        })
    }
}

module.exports = TaskController