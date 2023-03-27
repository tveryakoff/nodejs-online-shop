const Product = require('../models/product')
const {Cart} = require('../models/Cart')

const createProduct = async (req, res) => {
  const productData = {
    title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description
  }

  const {user} = req

  await user.createProduct(productData)

  // create new product and save to DB right away
  // const result = await Product.create(productData)
  return res.redirect('/admin/product-list');
}

const updateProduct = async (req, res) => {
  const productData = {
    title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description
  }

  try {
    const product = await req.user.getProducts({where: {id: req.body.productId}})?.[0]
    product.title = productData.title
    product.imageUrl = productData.imageUrl
    product.price = productData.price
    product.description = productData.description

    await product.save()

    return res.redirect('/admin/product-list')

  } catch (e) {
    console.error('error during product update', e)
  }

}

const deleteProduct = async (req, res) => {
  const id = req.body.productId
  const product = await Product.findByPk(id)

  if (product) {
    await product.destroy()
  }

  return res.redirect('/admin/product-list')
}

const getProducts = async (req, res) => {
  const {user} = req
  let productList = []

  if (user) {
    productList = await user.getProducts()
  }

  return res.render('admin/product-list.pug', {
    productList, pageTitle: 'Admin-products', path: '/admin/product-list'
  })

}

const getProductForm = async (req, res) => {
  const productId = req.params.productId

  if (productId) {
    const productList = await req.user.getProducts({where: {id: productId}})
    return res.render('admin/product-form.pug', {
      pageTitle: 'Edit product', path: '/admin/add-product', product: productList[0], isEdit: true
    })
  }

  return res.render('admin/product-form.pug', {
    pageTitle: 'Add product', path: '/admin/add-product', isEdit: false
  })
}

module.exports = {
  getProductForm, createProduct, getProducts, updateProduct, deleteProduct
}

