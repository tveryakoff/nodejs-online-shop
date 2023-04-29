const express = require('express')
const { createProduct,getProducts, getProductForm,updateProduct, deleteProduct} = require("../controllers/admin");
const {validateCreateEditProduct} = require("../validators/admin");

const adminRouts = express.Router()

adminRouts.get('/add-product', getProductForm)

adminRouts.get('/product-list', getProducts)

adminRouts.get('/product-edit/:productId', getProductForm)

adminRouts.post('/product-add', validateCreateEditProduct, createProduct)

adminRouts.post('/product-edit', validateCreateEditProduct, updateProduct)

adminRouts.post('/product-delete', deleteProduct)


module.exports = {
  adminRouts,
}
