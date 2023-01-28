const fs = require('fs')
const {getProductsFromFile} = require("../utils/file");
const path = require("path");
const rootDir = require("../constants/rootDir");

const productFilePath = path.join(rootDir, 'data', 'products.json')


class Product {
  constructor(props) {
    this.title = props.title
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  saveToFile() {
    getProductsFromFile((productList) => {
      const newList = [...productList]
      newList.push(this)
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
