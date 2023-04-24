const {User} = require("../models/user");
const bcrypt = require('bcryptjs')

const getLogin = (req, res) => {
  return res.render('auth/login', {pageTitle: 'Login', path: '/login'})
}

const postLogin = async (req, res) => {
  req.session.isLoggedIn = true
  const {email, password} = req.body
  const user = await User.findOne({email})

  if (!user) {
    console.log(`User with email ${email} not found`)
    return res.redirect('/login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (isMatch) {
    req.session.user = user
    req.session.isLoggedIn = true
    return req.session.save(res.redirect('/'))
  }

  return res.redirect('/login')

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
  const user = await User.findOne({email})
  if (user) {
    return res.redirect('/signUp')
  }
  const hashedPassword = await bcrypt.hash(password, 12)
  const newUser = new User({email, password: hashedPassword})
  await newUser.save()
  return res.redirect('/login')
}

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignUp,
  postSignUp
}
