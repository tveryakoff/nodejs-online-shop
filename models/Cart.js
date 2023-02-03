const path = require('path')
const rootDir = require('../constants/rootDir')
const fs = require('fs/promises');
const fsCallback = require('fs')

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
}

module.exports = {
  Cart
}
