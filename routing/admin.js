const express = require('express')
const { createProduct,getProducts, getProductForm,updateProduct, deleteProduct, deleteProductRest} = require("../controllers/admin");
const {validateCreateEditProduct} = require("../validators/admin");
const multer = require('multer')
const storage = require("../services/FileStorage");


const adminRouts = express.Router()

const fileFilter = (req,file,cb) => {
  console.log('file', file.mimetype)
  if (file.mimetype.includes('image')) {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}

const upload = multer({ storage,fileFilter })


adminRouts.get('/add-product', getProductForm)

adminRouts.get('/product-list', getProducts)

adminRouts.get('/product-edit/:productId', getProductForm)

adminRouts.post('/product-add', upload.single('image'), validateCreateEditProduct, createProduct)

adminRouts.post('/product-edit',  upload.single('image'), validateCreateEditProduct, updateProduct)

adminRouts.post('/product-delete', deleteProduct)

adminRouts.delete('/product/:productId', deleteProductRest)


module.exports = {
  adminRouts,
}
