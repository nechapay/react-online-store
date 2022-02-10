const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
  async create(req, res) {
    try {
      const { name } = req.body
      const type = await Type.create({ name })
      return res.json(type)
    } catch (error) {
      console.log(`Type controller error`)
    }
  }

  async getAll(req, res) {
    try {
      const types = await Type.findAll()
      return res.json(types)
    } catch (error) {
      console.log(`Type controller error`)
    }
  }
}

module.exports = new TypeController()
