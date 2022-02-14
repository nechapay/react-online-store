const jwt = require('jsonwebtoken')
module.exports = (role) => {
  return (req, res, next) => {
    try {
      if (req.method === 'OPTIONS') {
        next()
      }
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Access denied' })
      }
      req.user = decoded
      next()
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
}
