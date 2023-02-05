const fs = require('fs/promises')
const {getProductsFromFile, saveProductListToFile} = require("../utils/file");
const path = require("path");
const rootDir = require("../constants/rootDir");
const uniqueId = require("uniqid");

const db = require('../utils/database')


class Product {
  constructor(product) {
    const id = uniqueId()
    this.product = {
      title: product.title || null,
      price: product.price || null,
      description: product.description || null,
      imageUrl: product.imageUrl || null
    }
  }

  static async fetchAll() {
    const [rows, meta] = await  db.execute('SELECT * FROM product')
    return rows
  }

  static async getProductById(productId) {
    const [rows, meta] = await db.execute('SELECT * FROM product WHERE product.id = ?', [productId])

    return rows[0]
  }

  static async updateProduct(product) {
    const existingProduct = await Product.getProductById(product.id)
    if (!existingProduct) {
      return Promise.reject({status: 404, message: 'No Product Found'})
    }

    const productList = await getProductsFromFile()
    const newList = [...productList]
    const index = newList.findIndex(p => p.id === product.id)
    newList[index] = product
    return await saveProductListToFile(newList)
  }

  static async deleteProductById(productId) {
    const productList = await getProductsFromFile()
    const newProductList = productList.filter(p => p.id !== productId)
    return await saveProductListToFile(newProductList)
  }

  async saveToFile() {
    const productList = await getProductsFromFile()
    const newList = [...productList]
    newList.push(this.product)
    return await saveProductListToFile(newList)
  }

  async save() {
    return db.execute('INSERT INTO product (title, price, description, imageUrl) VALUES(?,?,?,?)', [
      this.product.title, this.product.price, this.product.description, this.product.imageUrl
    ])
  }

}

module.exports = {
  Product
}
