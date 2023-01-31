const {Product} = require('../models/product')

const getIndex = (req, res) => {
  Product.fetchAll((productList) => res.render('shop/index.pug', {
    productList,
    pageTitle: 'Welcome',
    path: '/'
  }))
}

const getProducts = (req, res, next) => {
  Product.fetchAll((productList) => res.render('shop/product-list.pug', {
    productList,
    pageTitle: 'product-list',
    path: '/product-list'
  }))
}

const getCart = (req, res, next) => {
  res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart'})
}

const getOrderList = (req, res) => {
  res.render('shop/orderList.pug', {pageTitle: 'Your orders', path: '/order-list'})
}

const getCheckout = (req, res) => {
  res.render('shop/checkout', {pageTitle: 'checkout', path: '/checkout'})
}

module.exports = {
  getIndex, getProducts,getCart,getCheckout,getOrderList
}
