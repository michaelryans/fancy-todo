const router = require('express').Router()
const userController = require('../controllers/user')
const taskController = require('../controllers/task')


router.post('/login', userController.login)

//google login
router.post('/google-login', userController.googleLogin)

//task
router.post('/task', taskController.create)


//user
router.post('/user', userController.create)


module.exports = router