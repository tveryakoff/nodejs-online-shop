const express = require('express')
const path = require('path')
const rootDir = require('../constants/rootDir')
const {productList} = require('./admin')

const shopRoutes = express.Router()

shopRoutes.get('/', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'shop', 'home.pug'), {productList, pageTitle: 'Shop', path: '/'})
})

module.exports = {
  shopRoutes
}
