const User = require('../models/user')

const auth = async (req, res, next) => {
  if (req.user) {
    next()
  }
  const user = await User.findByPk(1)

  if (user) {
    req.user = user
  }

  next()
}

module.exports = auth
