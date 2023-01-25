const express = require('express')
const path = require('path')
const rootDir = require('../constants/rootDir')

const shopRoutes = express.Router()

shopRoutes.get('/',(req,res,next) => {
  res.sendFile(path.join(rootDir, 'views', 'shop', 'home.html'))
})

module.exports = {
  shopRoutes
}
