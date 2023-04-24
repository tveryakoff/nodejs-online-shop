const {Product} = require('../models/product')
const Order =require('../models/orders')
const getCurrentUser = require('../utils/getUser')

const getIndex = async (req, res) => {
  const productList = await Product.find()

  res.render('shop/index.pug', {
    productList, pageTitle: 'Welcome', path: '/'
  })
}

const getProducts = async (req, res, next) => {
  const productList = await Product.find()
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
  const user = getCurrentUser(req)
  await user.populate('cart.items.cartProductId')
  return res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart', productList: user.cart.items, totalPrice: user.totalPrice, userId: user._id})
}

const addProductToCart = async (req, res) => {
  const user = getCurrentUser(req)
  const productId = req.body.productId
  if (!productId) {
    return
  }
  await user.addProductToCart(productId)
  return res.redirect('/cart')
}

const createOrder = async (req, res) => {
  const user = getCurrentUser(req)
  await user.populate('cart.items.cartProductId')
  await user.populate('cart.totalPrice')
  const order = new Order({
    user: {
      name: user.name,
      userId: user?._id,
    },
    totalPrice: user.cart.totalPrice,
    products: user.cart.items.map(item => ({count: item.count, productData: {title: item.cartProductId.title, price: item.cartProductId.price, _id: item.cartProductId._id}}))
  })
  await order.save()
  await user.clearCart()
  return res.redirect(`/order/${order._id}`)
}

const getUserOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId
    if (!orderId) {
      return res.render('errors/404')
    }

    const order = await Order.findById(orderId)
    return res.render('shop/order.pug', {pageTitle: 'order', order})
  } catch (e) {
    console.error(e)
  }
}

const deleteProductFromCart = async (req, res) => {
  try {
    const user = getCurrentUser(req)

    await user.removeProductFromCart(req.body.productId)

    return res.redirect('/cart')
  } catch (e) {
    console.error(e)
  }
}

const getOrderList = async (req, res) => {
  const user = getCurrentUser(req)
  const orderList  = await Order.find({"user.userId": user._id})
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
