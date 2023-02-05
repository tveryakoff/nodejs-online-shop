const {Product} = require('../models/product')
const {Cart} = require('../models/Cart')

const getIndex = async (req, res) => {
  const productList = await Product.fetchAll()

  res.render('shop/index.pug', {
    productList, pageTitle: 'Welcome', path: '/'
  })
}

const getProducts = async (req, res, next) => {
  const productList = await Product.fetchAll()
  res.render('shop/product-list.pug', {
    productList, pageTitle: 'product-list', path: '/product-list'
  })
}

const getProductById = async (req, res, next) => {
  const productId = req.params.productId
  const product = await Product.getProductById(productId)
  console.log('product', product)
  return res.render('shop/product-detail', {pageTitle: product?.title || 'Product Detail', path: '/product-list', product})
}

const getCart = async (req, res, next) => {
  const productList = await Cart.getProducts()
  const cart = await Cart.getCart()
  return res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart', productList, cart})
}

const postCart = async (req, res) => {
  const prodId = req.body.productId
  const product = await Product.getProductById(prodId)
  await Cart.addProduct(product)
  res.redirect('/product-list')
}

const addProductToCart = async (req, res) => {
  const productId = req.body.productId
  if (!productId) {
    return
  }
  const product = await Product.getProductById(productId)
  await Cart.addProduct(product)
  return res.redirect('/cart')
}

const deleteProductFromCart = async (req, res) => {
  const productId = req.body.productId
  if (!productId) {
    return
  }

  await Cart.removeOneProduct(productId)
  return res.redirect('/cart')
}

const getOrderList = (req, res) => {
  res.render('shop/orderList.pug', {pageTitle: 'Your orders', path: '/order-list'})
}

const getCheckout = (req, res) => {
  res.render('shop/checkout', {pageTitle: 'checkout', path: '/checkout'})
}

module.exports = {
  getIndex, getProducts, getProductById, getCart, postCart, getCheckout, getOrderList, addProductToCart, deleteProductFromCart
}
