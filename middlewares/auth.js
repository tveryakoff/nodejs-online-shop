const {User} = require('../models/user')

const auth = async (req, res, next) => {
  if (req.user) {
    next()
  }
  const user = await User.findById('6425d669b463a4f61715a3c1')

  if (user) {
    req.user = user
  }

  next()
}

module.exports = auth
