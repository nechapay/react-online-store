const Router = require('express')
const router = new Router()

const user = require('./userRouter')
const device = require('./deviceRouter')
const type = require('./typeRouter')
const brand = require('./brandRouter')

router.use('/user', user)
router.use('/device', device)
router.use('/type', type)
router.use('/brand', brand)

module.exports = router
