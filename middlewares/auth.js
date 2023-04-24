const sessionExpress = require('express-session')
const {mongoDbSessionStore} = require('../utils/mongo-database')
const getCurrentUser = require('../utils/getUser')
const {User} = require("../models/user");


const session = sessionExpress({secret: 'my-secret', resave: false, saveUninitialized: false, store: mongoDbSessionStore})

const requireAuth = async (req,res,next) => {
  const userObj = getCurrentUser(req)
  if (!userObj) {
    return res.render('errors/404')
  }
  const user = await User.findById(userObj._id)
  req.user = user
  next()
}

const addData = async (req,res,next) => {
  const userObj = req.session?.user
  if (!userObj) {
    res.locals.isLoggedIn = false
    req.user = null
    return next()
  }
  const user = await User.findById(userObj._id)
  req.user = user

  res.locals.isLoggedIn = !!userObj

  return next()
}

module.exports = {
  session,
  requireAuth,
  addData
}
