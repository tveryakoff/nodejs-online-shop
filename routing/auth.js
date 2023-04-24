const express = require("express");
const {
  getLogin,
  postLogin,
  postLogout
} = require('../controllers/auth')

const authRoutes = express.Router()

authRoutes.get('/login', getLogin)

authRoutes.post('/login', postLogin)

authRoutes.post('/logout', postLogout)


module.exports = {
  authRoutes
}
