const express = require("express");
const {
  getLogin,
  postLogin,
  postLogout,
  getSignUp, postSignUp
} = require('../controllers/auth')

const authRoutes = express.Router()

authRoutes.get('/login', getLogin)

authRoutes.post('/login', postLogin)

authRoutes.post('/logout', postLogout)

authRoutes.get('/signUp', getSignUp)

authRoutes.post('/signUp', postSignUp)


module.exports = {
  authRoutes
}
