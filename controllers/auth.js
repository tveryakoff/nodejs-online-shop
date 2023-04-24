const {User} = require("../models/user");

const getLogin = (req, res) => {
  return res.render('auth/login', {pageTitle: 'Login', path: '/login'})
}

const postLogin = async (req, res) => {
  req.session.isLoggedIn = true
  const user = await User.findById('6425d669b463a4f61715a3c1')

  if (user) {
    req.session.user = user
    req.session.save()
    return res.redirect('/')
  }

  return res.redirect('/')

}

const postLogout = async (req, res, next) => {
  if (!req.session.user) {
    next()
  }
    await req.session.destroy()
    return res.redirect('/')
}

module.exports = {
  getLogin,
  postLogin,
  postLogout
}
