const express = require('express')
const path = require('path')
const rootDir = require('../constants/rootDir')

const adminRouts = express.Router()

adminRouts.get('/add-product', (req, res, next) => {
  return res.sendFile(path.join(rootDir, 'views', 'admin', 'add-product.html'))
})

adminRouts.post('/add-product', (req, res) => {
  console.log('req, body', req.body)
  res.redirect('/');
})


module.exports = {
  adminRouts
}
