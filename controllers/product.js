const path = require('path')
const rootDir = require('../constants/rootDir')
const {Product} = require('../models/product')

const getAddProduct = (req, res, next) => {
  return res.render(path.join(rootDir, 'views', 'admin', 'add-product.pug'), {
    pageTitle: 'Add product', path: '/admin/add-product'
  })
}

const createProduct = (req, res) => {
  const product = new Product(req.body)
  product.saveToFile()
  res.redirect('/');
}

const getProducts = (req, res, next) => {
  Product.fetchAll((productList) => res.render(path.join(rootDir, 'views', 'shop', 'home.pug'), {
    productList,
    pageTitle: 'Shop',
    path: '/'
  }))
}

module.exports = {
  getAddProduct, createProduct, getProducts
}
