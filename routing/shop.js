const express = require('express')
const {getProducts} = require("../controllers/product");

const shopRoutes = express.Router()

shopRoutes.get('/', getProducts)

module.exports = {
  shopRoutes
}
