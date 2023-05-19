const {Product} = require('../models/product')
const getCurrentUser = require('../utils/getUser')
const {getValidationErrorsMapped} = require("../utils/error");
const fs = require('fs/promises')
const path = require('path')
const rootDir = require('../constants/rootDir')

const createProduct = async (req, res, next) => {
  const user = getCurrentUser(req)

  const {errors, isEmpty}= getValidationErrorsMapped(req)
  const productData = {
    title: req.body.title, price: req.body.price, description: req.body.description, userId: user?._id
  }

  if (!isEmpty) {
    return res.status(422).render('admin/product-form.pug', {
      pageTitle: 'Add product', path: '/admin/add-product', product: productData, isEdit: false, errors,
    })
  }

  if (!req.file) {
    return res.status(422).render('admin/product-form.pug', {
      pageTitle: 'Add product', path: '/admin/add-product', product: productData, isEdit: false, errors: {image: 'Attach an image'},
    })
  }

  productData.imageUrl = req.file.filename

  const product = new Product(productData)

  try {
    await product.save()
  } catch (error) {
    return next({...error, status: 500})
  }

  return res.redirect('/admin/product-list');
}

const updateProduct = async (req, res) => {
  const productData = {
    title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description, _id: req.body._id
  }

  const {errors, isEmpty}= getValidationErrorsMapped(req)

  if (!isEmpty) {
    return res.status(422).render('admin/product-form.pug', {
      pageTitle: 'Edit product', path: '/admin/add-product', product: productData, isEdit: true, errors,
    })
  }

  if (req.file) {
    const product = await Product.findById(productData._id)
    // Delete old Image
    await fs.unlink(path.join(rootDir, 'assets', 'public', 'uploads', product.imageUrl))
    productData.imageUrl = req.file.filename
  }

  try {
    await Product.findOneAndUpdate({_id: req.body._id}, productData)

    return res.redirect('/admin/product-list')

  } catch (e) {
    console.error('error during product update', e)
  }
}

const deleteProduct = async (req, res) => {
  const id = req.body.productId
  await Product.deleteOne({_id: id})

  return res.redirect('/admin/product-list')
}

const deleteProductRest = async (req, res) => {
  try {
    const id = req.params.productId
    await Product.deleteOne({_id: id})
    return res.status(200).json({status: 'deleted'})
    }
  catch (e) {
    return res.status(500).json({status: 'error'})
  }
}

const getProducts = async (req, res) => {
  const user = getCurrentUser(req)
 const productList = await Product.find({userId: user._id})

  return res.render('admin/product-list.pug', {
    productList, pageTitle: 'Admin-products', path: '/admin/product-list'
  })
}

const getProductForm = async (req, res) => {
  const productId = req.params.productId

  if (productId) {
    const product = await Product.findById(productId)
    return res.render('admin/product-form.pug', {
      pageTitle: 'Edit product', path: '/admin/edit-product', product, isEdit: true
    })
  }

  return res.render('admin/product-form.pug', {
    pageTitle: 'Add product', path: '/admin/add-product', isEdit: false
  })
}

module.exports = {
  getProductForm, createProduct, getProducts, updateProduct, deleteProduct, deleteProductRest
}

