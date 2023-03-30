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
  createOrder, getUserOrder
} = require("../controllers/shop");

const shopRoutes = express.Router()

shopRoutes.get('/', getIndex)

shopRoutes.get('/product-list', getProducts)

shopRoutes.get('/product-detail/:productId', getProductById)
//
shopRoutes.get('/cart', getCart)
//
shopRoutes.post('/cart-add-product', addProductToCart)
//
shopRoutes.post('/cart-create-order', createOrder)
//
shopRoutes.get('/order/:orderId', getUserOrder)
//
shopRoutes.post('/cart-delete-product', deleteProductFromCart)
//
shopRoutes.get('/order-list', getOrderList)
//
// shopRoutes.get('/checkout', getCheckout)

module.exports = {
  shopRoutes
}
