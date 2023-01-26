const express = require('express')
const path = require('path')
const rootDir = require('../constants/rootDir')

const adminRouts = express.Router()

const productList = []

adminRouts.get('/add-product', (req, res, next) => {
  return res.render(path.join(rootDir, 'views', 'admin', 'add-product.pug'), {pageTitle: 'Add product', path: '/admin/add-product'})
})

adminRouts.post('/add-product', (req, res) => {
  productList.push({title: req.body.title})
  res.redirect('/');
})


module.exports = {
  adminRouts,
  productList
}
