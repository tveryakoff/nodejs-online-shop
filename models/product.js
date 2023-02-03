const fs = require('fs/promises')
const {getProductsFromFile} = require("../utils/file");
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

  async saveToFile() {
    const productList = await getProductsFromFile()
    const newList = [...productList]
    newList.push(this.product)
    return await fs.writeFile(productFilePath, JSON.stringify(newList))
  }

}

module.exports = {
  Product
}
