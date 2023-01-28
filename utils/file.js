const path = require('path')
const rootDir = require('../constants/rootDir')
const fs = require("fs");

const productFilePath = path.join(rootDir, 'data', 'products.json')

const getProductsFromFile = (cb) => {
  fs.readFile(productFilePath, (err, fileContent) => {
    let products = []
    if (!err) {
      products = JSON.parse(fileContent)
    }

    cb(products)
  })
}

module.exports = {
  getProductsFromFile
}
