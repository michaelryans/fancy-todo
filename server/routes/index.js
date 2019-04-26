const router = require('express').Router()
const userController = require('../controllers/user')
const taskController = require('../controllers/task')
const {isLogin} = require('../middlewares/authentication')
const {isAuthorized} = require('../middlewares/authorization')
const {googleVerify} = require('../middlewares/google-sign')



//task
router.post('/task', isLogin, taskController.create)
router.get('/task', isLogin, taskController.findAll)
router.patch('/task/:id', isLogin, isAuthorized, taskController.updateStatus) //errror di sini
router.delete('/task/:id', isLogin, isAuthorized, taskController.deleteTask)


// router.get('/task/:id')
// router.patch('/task/:id')
// router.delete('task:id')

//isAuthorized,

//user
router.post('/user', userController.create)
//normal login
router.post('/login', userController.login)
//google login
router.post('/google-login', googleVerify, userController.googleLogin)

module.exports = router