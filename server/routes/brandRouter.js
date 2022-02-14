const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkPermission = require('../middleware/permission')

router.post('/', checkPermission('admin'), brandController.create)
router.get('/', brandController.getAll)

module.exports = router
