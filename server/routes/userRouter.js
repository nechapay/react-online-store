const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')
const auth = require('../middleware/auth')

router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/auth', auth, controller.check)

module.exports = router
