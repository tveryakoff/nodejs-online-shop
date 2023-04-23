const express = require("express");
const {
  getLogin
} = require('../controllers/auth')

const authRoutes = express.Router()

authRoutes.get('/login', getLogin)


module.exports = {
  authRoutes
}
