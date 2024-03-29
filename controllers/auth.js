const {User} = require("../models/user");
const bcrypt = require('bcryptjs')
const { promisify } = require('util')
const randomBytesAsync = promisify(require('crypto').randomBytes)
const sendMail = require('../services/Mail')
const {getRequestFlashedError, getValidationErrorsMapped} = require("../utils/error");


const getLogin = (req, res) => {
  const errorMessage = getRequestFlashedError(req)
  return res.render('auth/login', {pageTitle: 'Login', path: '/login', error: errorMessage})
}

const postLogin = async (req, res) => {
  req.session.isLoggedIn = true
  const {email, password} = req.body
  const user = await User.findOne({email})

  const {errors, isEmpty} = getValidationErrorsMapped(req)

  if (!isEmpty) {
    return res.status(422).render('auth/login', {pageTitle: 'Login', path: '/login', errors, values: {email, password}})
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (isMatch) {
    req.session.user = user
    req.session.isLoggedIn = true
    return req.session.save(res.redirect('/'))
  }

  return res.status(422).render('auth/login', {pageTitle: 'Login', path: '/login', errors: {email: 'Wrong email or password'}, values: {email, password}})

}

const postLogout = async (req, res, next) => {
  if (!req.session.user) {
    next()
  }
    await req.session.destroy(() => res.redirect('/'))
}

const getSignUp = async (req,res,next) => {
  return res.render('auth/signUp', {pageTitle: 'Sign Up', path: '/signUp'})
}

const postSignUp = async (req,res,next) => {
  const {email, password, confirmPassword} = req.body
  const {errors, isEmpty} = getValidationErrorsMapped(req)
  if (!isEmpty) {
    return res.status(422).render('auth/signUp', {pageTitle: 'Sign Up', path: '/signUp', errors, values:{email, password, confirmPassword}})
  }
  const hashedPassword = await bcrypt.hash(password, 12)
  const newUser = new User({email, password: hashedPassword})

  await sendMail({
    to: email,
    subject: 'Hello',
    html: '<p>Welcome to my online shop!</p>'
  })
  await newUser.save()
  return res.redirect('/login')
}

const getResetPassword = (req, res) => {
  const errorMessage = getRequestFlashedError(req)
  return res.render('auth/resetPassword', {pageTitle: 'Reset Password', path: '/reset-password', error: errorMessage})
}

const postResetPassword = async (req, res) => {
  try {
    const {email} = req.body
    const randomToken = await randomBytesAsync(32)
    const randomTokenStr = randomToken.toString('hex')
    const user = await User.findOne({email})
    if (!user) {
      req.flash('error', 'No users with such email found')
      return res.redirect('/reset-password')
    }
    user.resetToken = randomTokenStr
    user.resetTokenExpiration = Date.now() + 1000 * 60 * 60 // 1 hour in ms
    await user.save()

    sendMail({
      to: email,
      subject: 'Reset Password',
      html: `
            <p>You requested a password reset</p>
            <p>Click this <a href=http://${req.headers.host}/create-new-password/${randomTokenStr}>Link</a> to reset your password</p>
            <p>Link expires in 1 hour</p>
`
    })

    return res.render('auth/email-sent-confirmation', {pageTitle: 'Password recovery', path: '/email-sent-confirmation', email})

  }
  catch (e) {
    console.error('error', e)
  }
}

const getCreateNewPassword = async (req, res, next) => {
  const token = req?.params?.token

  if (!token) {
    req.flash('error', 'Wrong link, try again')
    return res.redirect('/reset-password')
  }

  const user = await User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
  if (!user) {
    req.flash('error', 'Wrong link, try again or token expired')
    return res.redirect('/reset-password')
  }
  return res.render('auth/create-new-password', {pageTitle: 'New Password', path: 'create-new-password', token, userId: user._id?.toString()})

}

const postCreateNewPassword = async (req, res, next) => {
  const {password, userId, token} = req.body

  const user = await User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}, _id: userId})

  if (!user) {
    console.error('user not found')
    return res.redirect('/')
  }

  const passwordHash = await bcrypt.hash(password, 12)
  user.password = passwordHash
  user.resetToken = undefined
  user.resetTokenExpiration = undefined
  await user.save()

  return res.redirect('/login')

}

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignUp,
  postSignUp,
  getResetPassword,
  postResetPassword,
  getCreateNewPassword,
  postCreateNewPassword
}
