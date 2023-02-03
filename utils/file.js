const path = require('path')
const rootDir = require('../constants/rootDir')
const fs = require("fs/promises");

const productFilePath = path.join(rootDir, 'data', 'products.json')

const getProductsFromFile = async () => {
  try {
    const content = await fs.readFile(productFilePath)
    return JSON.parse(content)
  } catch (error) {
    console.error('error while parsing products from file', error)
    return Promise.reject(error)
  }
}

module.exports = {
  getProductsFromFile
}
