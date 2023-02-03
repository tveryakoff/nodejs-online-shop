const {Product} = require('../models/product')

const getAddProduct = (req, res, next) => {
  return res.render('admin/add-product.pug', {
    pageTitle: 'Add product', path: '/admin/add-product'
  })
}

const createProduct = async (req, res) => {
  const productData = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description

  }
  const product = new Product(productData)
  await product.saveToFile()
  res.redirect('/product-list');
}

const getProducts = async (req, res) => {
  const productList = Product.fetchAll()

  return res.render('admin/product-list.pug', {
    productList,
    pageTitle: 'Admin-products',
    path: '/admin/product-list'
  })

}

module.exports = {
  getAddProduct,
  createProduct,
  getProducts
}

