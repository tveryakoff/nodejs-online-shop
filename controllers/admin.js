const {Product} = require('../models/product')
const {Cart} = require('../models/Cart')

const createProduct = async (req, res) => {
  const productData = {
    title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description
  }
  const product = new Product(productData)
  await product.save()
  return res.redirect('/admin/product-list');
}

const updateProduct = async (req, res) => {
  const productData = {
    id: req.body.id,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description
  }
  await Product.updateProduct(productData)

  return res.redirect('/admin/product-list')
}

const deleteProduct = async (req, res) => {
  const id = req.body.productId
  await Product.deleteProductById(id)
  await Cart.removeProduct(id)

  return res.redirect('/admin/product-list')
}

const getProducts = async (req, res) => {
  const productList = await Product.fetchAll()

  return res.render('admin/product-list.pug', {
    productList, pageTitle: 'Admin-products', path: '/admin/product-list'
  })

}

const getProductForm = async (req, res) => {
  const productId = req.params.productId

  if (productId) {
    const product = await Product.getProductById(productId)
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

