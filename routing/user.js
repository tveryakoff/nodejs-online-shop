const express = require('express')
const path = require('path')
const rootDir = require('../constants/rootDir')

const router = express.Router()

const userList = []

router.get('/', (req, res, next) => {
  return res.render(path.join(rootDir, 'views', 'user', 'user.pug'))
})

router.get('/list', (req, res, next) => {
  return res.render(path.join(rootDir, 'views', 'user', 'user-list.pug'), {userList})
})

router.post('/user', (req, res, next) => {
  const user = req.body

  userList.push({name: user.name || 'user'})

  return res.redirect('/users/list')
})

module.exports = {
  userRouts: router,
  userList
}
