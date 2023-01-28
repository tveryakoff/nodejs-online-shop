const path = require('path')
const rootDir = require('../constants/rootDir')

const get404 = (req, res, next) => {
  res.status(404).render(path.join(rootDir, 'views', 'errors', '404.pug'), {pageTitle: '404'})
}

module.exports = {
  get404
}
