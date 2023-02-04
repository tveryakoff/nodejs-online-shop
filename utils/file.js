const path = require('path')
const rootDir = require('../constants/rootDir')
const fs = require("fs/promises");
const fsCallback = require('fs')

const productFilePath = path.join(rootDir, 'data', 'products.json')

const getProductsFromFile = async () => {
  try {
    if (!fsCallback.existsSync(productFilePath)) {
      return []
    }
    const content = await fs.readFile(productFilePath)
    return JSON.parse(content)
  } catch (error) {
    console.error('error while parsing products from file', error)
    return Promise.reject(error)
  }
}

const saveProductListToFile = async (productList) => {
  return fs.writeFile(productFilePath, JSON.stringify(productList))
}

module.exports = {
  getProductsFromFile,
  saveProductListToFile
}
