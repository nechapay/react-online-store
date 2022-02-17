const { Device, Brand, Type, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, rating, brandId, typeId } = req.body
      const { img } = req.files
      let { info } = req.body
      const fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const device = await Device.create({ name, price, rating, img: fileName, brandId, typeId })
      if (info) {
        info = JSON.parse(info)
        info.forEach(async (i) => {
          await DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.get('id')
          })
        })
      }

      return res.json(device)
    } catch (error) {
      console.log(`Device controller error ${error}`)
      next(ApiError.badRequest(error))
    }
  }

  async getAll(req, res, next) {
    try {
      let where = {}
      let include = []
      const limit = req.query.limit || 9
      const page = req.query.page || 1

      let offset = page * limit - limit
      if (req.query.brandId) {
        where.brandId = req.query.brandId
        include.push({ model: Brand })
      }
      if (req.query.typeId) {
        where.typeId = req.query.typeId
        include.push({ model: Type })
      }

      const devices = await Device.findAndCountAll({ include, where, limit, offset })
      return res.json(devices)
    } catch (error) {
      console.log(`Device controller error ${error}`)
      next(ApiError.badRequest(error))
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params
      const device = await Device.findOne({
        include: [
          {
            model: DeviceInfo,
            as: 'info'
          }
        ],
        where: { id }
      })
      return res.json(device)
    } catch (error) {
      console.log(`Device controller error ${error}`)
      next(ApiError.badRequest(error))
    }
  }
}

module.exports = new DeviceController()
