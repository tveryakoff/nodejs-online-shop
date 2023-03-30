const User = require('../models/user')

const auth = async (req, res, next) => {
  if (req.user) {
    next()
  }
  const user = await User.findById('6422fe0ed5fb510597f8620b')

  if (user) {
    req.user = new User(user)
  }

  next()
}

module.exports = auth
