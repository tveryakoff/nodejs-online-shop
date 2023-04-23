const getLogin = (req, res) => {
  return res.render('auth/login', {pageTitle: 'Login', path: '/login'})
}

module.exports = {
  getLogin
}
