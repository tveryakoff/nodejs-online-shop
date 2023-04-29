const express = require("express");
const {check} = require('express-validator')
const {
  getLogin,
  postLogin,
  postLogout,
  getSignUp, postSignUp, getResetPassword, postResetPassword, getCreateNewPassword,postCreateNewPassword
} = require('../controllers/auth')
const {signUpValidator, signInValidator} = require("../validators/auth");


const authRoutes = express.Router()

authRoutes.get('/login', getLogin)

authRoutes.post('/login', signInValidator, postLogin)

authRoutes.post('/logout', postLogout)

authRoutes.get('/signUp', getSignUp)

authRoutes.post('/signUp', signUpValidator, postSignUp)

authRoutes.get ('/reset-password', getResetPassword)

authRoutes.post('/reset-password', postResetPassword)

authRoutes.get('/create-new-password/:token', getCreateNewPassword)

authRoutes.post('/create-new-password', postCreateNewPassword)


module.exports = {
  authRoutes
}
