const path = require('path')
const rootDir = require('../constants/rootDir')
const fs = require("fs");

const productFilePath = path.join(rootDir, 'data', 'products.json')

const getProductsFromFile = (cb) => {
  fs.readFile(productFilePath, (err, fileContent) => {
    let products = []
    if (!err) {
      try {
        products = JSON.parse(fileContent)
      } catch (error) {
        console.error('error while parsing products from file', error)
      }
    }

    cb(products)
  })
}

module.exports = {
  getProductsFromFile
}
