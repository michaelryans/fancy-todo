const router = require('express').Router()
const userController = require('../controllers/user')
const taskController = require('../controllers/task')
const {isLogin} = require('../middlewares/authentication')


router.post('/test', (req,res) => {
    console.log('masuk test')
    console.log('--------------- req body-----------')
    console.log(req.body)
    res.json(req.body)
})



router.post('/login', userController.login)

//google login
router.post('/google-login', userController.googleLogin)

//task
router.post('/task', isLogin, taskController.create)
router.get('/task', isLogin, taskController.findAll)
router.patch('/task', taskController.updateStatus)
router.delete('/task', taskController.deleteTask)

//user
router.post('/user', userController.create)


module.exports = router