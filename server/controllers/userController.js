const ApiError = require('../error/ApiError')
const bcrypt = require('bcryptjs')
const { User, Basket } = require('../models/models')
const jwt = require('jsonwebtoken')

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body
      if (!password) {
        return next(ApiError.badRequest('Incorrect password'))
      }
      if (!email) {
        return next(ApiError.badRequest('Incorrect email'))
      }
      const candidate = await User.findOne({ where: { email } })
      if (candidate) {
        return next(ApiError.badRequest('Email already taken'))
      }
      const hashPassword = await bcrypt.hash(password, 12)
      const user = await User.create({ email, role, password: hashPassword })
      const basket = await Basket.create({ userId: user.get('id') })
      const token = jwt.sign({ id: user.get('id'), email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
      return res.json({ token })
    } catch (error) {
      console.log('registration', error)
      return next(ApiError.badRequest(error))
    }
  }

  async login(req, res) {}

  async check(req, res, next) {
    const { id } = req.query

    if (!id) {
      return next(ApiError.badRequest('no id'))
    }

    res.json(id)
  }
}

module.exports = new UserController()
