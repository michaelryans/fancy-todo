const router = require('express').Router()
const userController = require('../controllers/user')
const taskController = require('../controllers/task')


router.get('/login', (req,res) => {
    res.json('routing sudah jalan')
})

//task
router.post('/task', taskController.create)


//user
router.post('/user', userController.create)


module.exports = router