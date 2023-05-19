const express = require('express')
const {
  getCart,
  getProducts,
  getProductById,
  getIndex,
  getCheckout,
  getOrderList,
  addProductToCart,
  deleteProductFromCart,
  createOrder, getUserOrder,
  downloadInvoice,
  processPayment
} = require("../controllers/shop");
const {requireAuth} = require("../middlewares/auth");

const shopRoutes = express.Router()

shopRoutes.get('/', getIndex)

shopRoutes.get('/product-list', getProducts)

shopRoutes.get('/product-detail/:productId', getProductById)

shopRoutes.get('/cart', requireAuth, getCart)

shopRoutes.post('/cart-add-product', requireAuth, addProductToCart)


shopRoutes.get('/order/:orderId', requireAuth, getUserOrder)

shopRoutes.post('/cart-delete-product',requireAuth, deleteProductFromCart)

shopRoutes.get('/order-list',requireAuth, getOrderList)

shopRoutes.get('/checkout', requireAuth, getCheckout),
shopRoutes.post('/checkout-processPayment', requireAuth, processPayment),
shopRoutes.get('/cart-create-order', requireAuth, createOrder)


shopRoutes.get('/order-invoice/:orderId', requireAuth, downloadInvoice)

module.exports = {
  shopRoutes
}
