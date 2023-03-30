const express = require('express')
const { createProduct,getProducts, getProductForm,updateProduct, deleteProduct} = require("../controllers/admin");

const adminRouts = express.Router()

adminRouts.get('/add-product', getProductForm)

adminRouts.get('/product-list', getProducts)
//
// adminRouts.get('/product-edit/:productId', getProductForm)

adminRouts.post('/product-add', createProduct)

// adminRouts.post('/product-edit', updateProduct)
//
// adminRouts.post('/product-delete', deleteProduct)


module.exports = {
  adminRouts,
}
