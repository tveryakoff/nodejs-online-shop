const fs = require('fs/promises')
const {getProductsFromFile, saveProductListToFile} = require("../utils/file");
const path = require("path");
const rootDir = require("../constants/rootDir");
const uniqueId = require("uniqid");

const productFilePath = path.join(rootDir, 'data', 'products.json')


class Product {
  constructor(product) {
    const id = uniqueId()
    this.product = {...product, id}
  }

  static async fetchAll() {
    return await getProductsFromFile()
  }

  static async getProductById(productId) {
    const productList = await getProductsFromFile()
    return productList.find(p => p.id === productId)
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

}

module.exports = {
  Product
}
