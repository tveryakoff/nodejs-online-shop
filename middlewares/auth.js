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
  const user = await User.findById('6425d669b463a4f61715a3c1')
  req.session.user = user
  await req.session.save()
  next()
}

const addResData = async (req,res,next) => {
  const userObj = getCurrentUser(req)
  if (userObj) {
    res.locals.isLoggedIn = true
  }
  next()
}

module.exports = {
  session,
  requireAuth,
  addResData
}
