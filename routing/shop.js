const express = require('express')
const {getCart, postCart, getProducts, getProductById, getIndex, getCheckout, getOrderList,addProductToCart,deleteProductFromCart} = require("../controllers/shop");

const shopRoutes = express.Router()

shopRoutes.get('/', getIndex)

shopRoutes.get('/product-list',getProducts)

shopRoutes.get('/product-detail/:productId', getProductById)

shopRoutes.get('/cart', getCart)

shopRoutes.post('/cart-add-product', addProductToCart)
shopRoutes.post('/cart-delete-product', deleteProductFromCart)

shopRoutes.post('/cart', postCart)

shopRoutes.get('/order-list', getOrderList)

shopRoutes.get('/checkout',getCheckout)

module.exports = {
  shopRoutes
}
