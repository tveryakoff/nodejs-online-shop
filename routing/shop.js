const express = require('express')

const shopRoutes = express.Router()

shopRoutes.get('/products', (req,res,next) => {
  res.send(`<h1>Product List</h1>`)
})


shopRoutes.get('/',(req,res,next) => {
  res.send(`<h1>Welcome</h1>`)
})

module.exports = {
  shopRoutes
}
