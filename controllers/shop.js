const {Product} = require('../models/product')

const getIndex = (req, res) => {
  Product.fetchAll((productList) => res.render('shop/index.pug', {
    productList, pageTitle: 'Welcome', path: '/'
  }))
}

const getProducts = (req, res, next) => {
  Product.fetchAll((productList) => res.render('shop/product-list.pug', {
    productList, pageTitle: 'product-list', path: '/product-list'
  }))
}

const getProductById = (req, res, next) => {
  const productId = req.params.productId
  Product.getProductById(productId, (product) => {
    res.render('shop/product-detail', {pageTitle: product.name || 'Product Detail', path: '/product-list', product})
  })
}

const getCart = (req, res, next) => {
  res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart'})
}

const postCart = (req, res) => {
  const prodId = req.body.productId
  console.log('prodId', prodId)
  res.redirect('/cart')
}

const getOrderList = (req, res) => {
  res.render('shop/orderList.pug', {pageTitle: 'Your orders', path: '/order-list'})
}

const getCheckout = (req, res) => {
  res.render('shop/checkout', {pageTitle: 'checkout', path: '/checkout'})
}

module.exports = {
  getIndex, getProducts, getProductById, getCart,postCart, getCheckout, getOrderList
}
