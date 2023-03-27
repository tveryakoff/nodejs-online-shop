const Product = require('../models/product')
const {Cart} = require('../models/Cart')

const getIndex = async (req, res) => {
  const productList = await Product.findAll()

  res.render('shop/index.pug', {
    productList, pageTitle: 'Welcome', path: '/'
  })
}

const getProducts = async (req, res, next) => {
  const productList = await Product.findAll()
  res.render('shop/product-list.pug', {
    productList, pageTitle: 'product-list', path: '/product-list'
  })
}

const getProductById = async (req, res, next) => {
  const productId = req.params.productId
  const product = await Product.findByPk(productId)
  console.log('product', product)
  return res.render('shop/product-detail', {
    pageTitle: product?.title || 'Product Detail', path: '/product-list', product
  })
}

const getCart = async (req, res, next) => {
  const cart = await req.user.getCart()
  const productList = await cart.getProducts()
  return res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart', productList, cart})
}

const addProductToCart = async (req, res) => {
  const productId = req.body.productId
  if (!productId) {
    return
  }

  const userCart = await req.user.getCart()

  if (!userCart) {
    return Promise.reject('No cart')
  }

  const product = await Product.findByPk(productId)

  await userCart.addOneProduct(product)

  return res.redirect('/cart')
}

const createOrder = async (req, res) => {
  try {
    const {user} = req
    const userCart = await user.getCart()
    if (!userCart) {
      return Promise.reject('No cart')
    }

    const order = await user.createOrder()
    const products = await userCart.getProducts()
    const orderCreateList = []
    for (const product of products) {
      orderCreateList.push(order.addProduct(product, {through: {count: product.cartItem.count}}))
    }

    await Promise.all(orderCreateList)
    await userCart.setProducts(null)

    return res.redirect('/order')
  } catch (e) {
    console.error(e)
  }
}

const getUserOrder = async (req, res) => {
  try {
    const order = await req.user.getOrder({include: ['products']})
    return res.render('shop/order.pug', {pageTitle: 'order', order})
  } catch (e) {
    console.error(e)
  }
}

const deleteProductFromCart = async (req, res) => {
  try {
    const userCart = await req.user.getCart()

    await userCart.removeOneProduct(req.body.productId)

    return res.redirect('/cart')
  } catch (e) {
    console.error(e)
  }
}

const getOrderList = (req, res) => {
  res.render('shop/orderList.pug', {pageTitle: 'Your orders', path: '/order-list'})
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
