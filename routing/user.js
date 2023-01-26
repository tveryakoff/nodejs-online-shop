const express = require('express')
const path = require('path')
const rootDir = require('../constants/rootDir')

const router = express.Router()

router.get('/', (req, res, next) => {
  return res.sendFile(path.join(rootDir, 'views', 'user', 'home.html'))
})

router.get('/list', (req, res, next) => {
  return res.sendFile(path.join(rootDir, 'views', 'user', 'users.html'))
})

module.exports = {
  userRouts: router
}
