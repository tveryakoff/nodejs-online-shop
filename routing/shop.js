const express = require('express')
const {getCart, getProducts, getIndex, getCheckout, getOrderList} = require("../controllers/shop");

const shopRoutes = express.Router()

shopRoutes.get('/', getIndex)

shopRoutes.get('/product-list',getProducts)

shopRoutes.get('/cart', getCart)

shopRoutes.get('/order-list', getOrderList)

shopRoutes.get('/checkout',getCheckout)

module.exports = {
  shopRoutes
}
