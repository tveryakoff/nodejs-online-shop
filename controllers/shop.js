const {Product} = require('../models/product')
const Order = require('../models/orders')
const getCurrentUser = require('../utils/getUser')
const path = require('path')
const fs = require('fs')
const Pdfkit = require('pdfkit')
const rootDir = require('../constants/rootDir')

const getIndex = async (req, res) => {
  const productList = await Product.find()

  res.render('shop/index.pug', {
    productList, pageTitle: 'Welcome', path: '/'
  })
}

const getProducts = async (req, res, next) => {
  const page = +req.query.page || 1
  const limit = +req.query.limit || 1

  const totalProductCountPromise = Product.find().countDocuments()
  const productListPromise = Product.find().skip((page - 1) * limit).limit(limit)
  const [{value: productList}, {value: total}] = await Promise.allSettled([productListPromise, totalProductCountPromise])

  const pageDisplayCount = 5


  const totalPages = Math.ceil(total / limit)


  const start = Math.max(1, Math.min(page - Math.floor(pageDisplayCount / 2), totalPages - pageDisplayCount))

  const end = Math.min(totalPages, start + pageDisplayCount)

  const allPages = Array.from({ length: totalPages + 1 }, (_, index) => index)

  const pages = allPages.slice(start, end + 1)

  return res.render('shop/product-list.pug', {
    productList,
    total,
    pages,
    activePage: page,
    pageTitle: 'product-list',
    path: '/product-list'
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
  return res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
    productList: user.cart.items,
    totalPrice: user.totalPrice,
    userId: user._id
  })
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
      email: user.email,
      userId: user?._id,
    },
    totalPrice: user.cart.totalPrice,
    products: user.cart.items.map(item => ({
      count: item.count,
      productData: {title: item.cartProductId.title, price: item.cartProductId.price, _id: item.cartProductId._id}
    }))
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
  const orderList = await Order.find({"user.userId": user._id})
  res.render('shop/orderList.pug', {pageTitle: 'Your orders', path: '/order-list', orderList})
}

const getCheckout = (req, res) => {
  res.render('shop/checkout', {pageTitle: 'checkout', path: '/checkout'})
}

const downloadInvoice = async (req, res) => {
  const orderId = req.params.orderId
  const order = await Order.findById(orderId)
  if (order?.user?.userId?.toString?.() !== req.user._id.toString?.()) {
    return res.render('errors/404.pug', {pageTitle: 'No such order invoice'})
  }
  const invoiceName = `order-invoice-${orderId}.pdf`
  const invoicePath = path.join(rootDir, 'assets', 'protected', 'order-invoices', invoiceName)

  // Not optimized way to read a file, file is read completely and stored im memory, than served
  // const fileData = await fs.readFile(invoicePath)
  //  return res.send(fileData)

  const pdfDoc = new Pdfkit()

  res.setHeader('Content-Type', 'application/pdf')

  // Sets the right name and extension for downloading
  res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"')

  pdfDoc.pipe(fs.createWriteStream(invoicePath))
  pdfDoc.pipe(res)

  pdfDoc.fontSize(26).text('Invoice', {underline: true})

  for (const product of order.products) {
    pdfDoc.fontSize(14).text(`${product.productData.title}, count: (${product.count}), price: $${product.productData.price}`)
  }

  pdfDoc.fontSize(16).text(`Total Price: $${order.totalPrice}`)
  pdfDoc.end()
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
  getUserOrder,
  downloadInvoice
}
