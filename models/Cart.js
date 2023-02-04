const path = require('path')
const rootDir = require('../constants/rootDir')
const fs = require('fs/promises');
const fsCallback = require('fs')
const {Product} = require("./product");

const p = path.join(rootDir, 'data', 'cart.json')

const INITIAL_CARD = {products: [], totalPrice: 0}

class Cart {
  static async getCart() {
    const fileExists = fsCallback.existsSync(p)
    if (!fileExists) {
      return INITIAL_CARD
    }
    const fileContent = await fs.readFile(p)
    return JSON.parse(fileContent)
  }

  static async saveCartToFile(cart) {
    return await fs.writeFile(p, JSON.stringify(cart))
  }

  static async getProducts() {
    const cart = await Cart.getCart()
    if (!cart) {
      return []
    }

    const products = await Product.fetchAll()

    if (!products?.length) {
      return
    }

    const result = []

    for (const product of cart.products) {
      const productData = products.find(p => p.id === product.id)
      if (productData) {
        result.push({...productData, count: product.count})
      }
    }

    return result
  }

  static async addProduct(newProduct) {
    const cart = await Cart.getCart()

    if (!cart) {
      return Promise.reject({message: 'No cart found'})
    }

    const existingProductIndex = cart?.products?.findIndex(product => product.id === newProduct.id)
    const existingProduct = cart.products[existingProductIndex]

    if (existingProduct) {
      const productCount = parseInt(existingProduct.count, 10)
      cart.products[existingProductIndex] = {...existingProduct, count: productCount + 1}
      cart.totalPrice += existingProduct.price
    } else {
      const product = {id: newProduct.id, price: parseInt(newProduct.price, 10), count: 1}
      cart.products = [...cart.products, product]
      cart.totalPrice += product.price
    }
    return Cart.saveCartToFile(cart)
  }

  static async removeProduct(id) {
    const cart = await Cart.getCart()
    const productIndex = cart?.products?.findIndex(p => p?.id === id)
    const product = cart.products[productIndex]

    if (!cart || !product) {
      return Promise.reject({message: 'No cart found'})
    }

    cart.totalPrice -= (product?.price || 0) * (product?.count || 0)
    cart.products = cart.products.filter(p => p.id !== id)


    return Cart.saveCartToFile(cart)
  }


  static async removeOneProduct(id) {
    const cart = await Cart.getCart()
    const productIndex = cart?.products?.findIndex(p => p?.id === id)
    const product = cart.products[productIndex]

    if (!cart || !product) {
      return Promise.reject({message: 'No cart found'})
    }

    cart.totalPrice -= (product?.price || 0)
    if (product.count === 1) {
      cart.products = cart.products.filter(p => p.id !== id)
    } else if (product.count > 1) {
      cart.products[productIndex].count -= 1
    }
    return Cart.saveCartToFile(cart)
  }
}

module.exports = {
  Cart
}
