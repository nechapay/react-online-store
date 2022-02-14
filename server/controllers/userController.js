const ApiError = require('../error/ApiError')
const bcrypt = require('bcryptjs')
const { User, Basket } = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
  return jwt.sign({ id: id, email: email, role: role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}
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
      const basket = await Basket.findOrCreate({
        where: { userId: user.get('id') },
        defaults: {
          userId: user.get('id')
        }
      })
      const token = generateJwt(user.get('id'), email, role)
      return res.json({ token })
    } catch (error) {
      console.log('registration', error)
      return next(ApiError.badRequest(error))
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return next(ApiError.internal('User not exists'))
      }
      const comparePassword = bcrypt.compareSync(password, user.get('password'))
      if (!comparePassword) {
        return next(ApiError.internal('Incorrect password'))
      }
      const token = generateJwt(user.get('id'), user.get('email'), user.get('role'))
      return res.json({ token })
    } catch (error) {
      console.log('login', error)
      return next(ApiError.badRequest(error))
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role)
      return res.json({ token })
    } catch (error) {
      console.log('check', error)
      return next(ApiError.badRequest(error))
    }
  }
}

module.exports = new UserController()
