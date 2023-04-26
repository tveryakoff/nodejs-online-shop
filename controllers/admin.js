const {Product} = require('../models/product')
const getCurrentUser = require('../utils/getUser')

const createProduct = async (req, res) => {
  const user = getCurrentUser(req)
  const productData = {
    title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description, userId: user?._id
  }

  const product = new Product(productData)

  await product.save()

  return res.redirect('/admin/product-list');
}

const updateProduct = async (req, res) => {
  const productData = {
    title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description, _id: req.body._id
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
      pageTitle: 'Edit product', path: '/admin/add-product', product, isEdit: true
    })
  }

  return res.render('admin/product-form.pug', {
    pageTitle: 'Add product', path: '/admin/add-product', isEdit: false
  })
}

module.exports = {
  getProductForm, createProduct, getProducts, updateProduct, deleteProduct
}

