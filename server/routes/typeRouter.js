const Router = require('express')
const router = new Router()
const TypeController = require('../controllers/typeController')
const checkPermission = require('../middleware/permission')

router.post('/', checkPermission('admin'), TypeController.create)
router.get('/', TypeController.getAll)
module.exports = router
