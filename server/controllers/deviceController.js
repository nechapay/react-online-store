const { Device } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, rating, brandId, typeId, info } = req.body
      const { img } = req.files
      const fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const device = await Device.create({ name, price, rating, img: fileName, brandId, typeId })
      return res.json(device)
    } catch (error) {
      console.log(`Device controller error`)
      next(ApiError.badRequest(error))
    }
  }

  async getAll(req, res) {
    try {
      const devices = await Device.findAll()
      return res.json(devices)
    } catch (error) {
      console.log(`Device controller error`)
    }
  }
  async getOne(req, res) {}
}

module.exports = new DeviceController()
