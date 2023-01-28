const express = require('express')
const {getAddProduct, createProduct} = require("../controllers/product");

const adminRouts = express.Router()

adminRouts.get('/add-product', getAddProduct)

adminRouts.post('/add-product', createProduct)


module.exports = {
  adminRouts,
}
