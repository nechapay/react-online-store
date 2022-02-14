const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkPermission = require('../middleware/permission')

router.post('/', checkPermission('admin'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router
