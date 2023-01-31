const express = require('express')
const {getAddProduct, createProduct,getProducts} = require("../controllers/admin");

const adminRouts = express.Router()

adminRouts.get('/add-product', getAddProduct)

adminRouts.get('/product-list', getProducts)

adminRouts.post('/add-product', createProduct)


module.exports = {
  adminRouts,
}
