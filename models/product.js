const fs = require('fs')
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

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  static getProductById(productId, cb) {
    getProductsFromFile(productList => {
      const product = productList.find(p => p.id === productId)
      cb({...product, })
    })
  }

  saveToFile() {
    getProductsFromFile((productList) => {
      const newList = [...productList]
      newList.push(this.product)
      fs.writeFile(productFilePath, JSON.stringify(newList), err => {
        if (err) {
          console.error(err)
        }
      })
    })
  }

}

module.exports = {
  Product
}
