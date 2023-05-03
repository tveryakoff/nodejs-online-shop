const express = require('express')
const { createProduct,getProducts, getProductForm,updateProduct, deleteProduct} = require("../controllers/admin");
const {validateCreateEditProduct} = require("../validators/admin");
const multer = require('multer')
const path = require('path')
const rootDir = require('../constants/rootDir')
const storage = require("../services/FileStorage");

const adminRouts = express.Router()

const fileFilter = (req,file,cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}

adminRouts.get('/add-product', getProductForm)

adminRouts.get('/product-list', getProducts)

adminRouts.get('/product-edit/:productId', getProductForm)

adminRouts.post('/product-add', multer({storage, fileFilter}).single('image'), validateCreateEditProduct, createProduct)

adminRouts.post('/product-edit', validateCreateEditProduct, updateProduct)

adminRouts.post('/product-delete', deleteProduct)


module.exports = {
  adminRouts,
}
