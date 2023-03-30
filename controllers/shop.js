const Product = require('../models/product')
const {Cart} = require('../models/Cart')
const Order =require('../models/orders')

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
  const product = await Product.findById(productId)
  return res.render('shop/product-detail', {
    pageTitle: product?.title || 'Product Detail', path: '/product-list', product
  })
}

const getCart = async (req, res, next) => {
  const cart = await req.user.getCart()
  return res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart', productList: cart.productList, totalPrice: cart.totalPrice, userId: req.user._id})
}

const addProductToCart = async (req, res) => {
  const productId = req.body.productId
  if (!productId) {
    return
  }


  await req.user.addProductToCart(productId)

  return res.redirect('/cart')
}

const createOrder = async (req, res) => {
  const orderId = await req.user.createOrder()
  return res.redirect(`/order/${orderId}`)
}

const getUserOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId
    if (!orderId) {
      return res.render('errors/404')
    }

    const order = await Order.fetchById(orderId)
    return res.render('shop/order.pug', {pageTitle: 'order', order})
  } catch (e) {
    console.error(e)
  }
}

const deleteProductFromCart = async (req, res) => {
  try {

    await req.user.removeProductFromCart(req.body.productId)

    return res.redirect('/cart')
  } catch (e) {
    console.error(e)
  }
}

const getOrderList = async (req, res) => {
  const orderList = await req.user.getOrders()
  res.render('shop/orderList.pug', {pageTitle: 'Your orders', path: '/order-list', orderList})
}

const getCheckout = (req, res) => {
  res.render('shop/checkout', {pageTitle: 'checkout', path: '/checkout'})
}

module.exports = {
  getIndex,
  getProducts,
  getProductById,
  getCart,
  getCheckout,
  getOrderList,
  addProductToCart,
  deleteProductFromCart,
  createOrder,
  getUserOrder
}
