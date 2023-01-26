const express = require('express')
const {shopRoutes, adminRouts, userRouts} = require('./routing')
const path = require('path')
const rootDir = require('./constants/rootDir')

const app = express()

app.set('view engine', 'pug');

// Already default folder
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminRouts)
app.use('/users', userRouts)
app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).render(path.join(rootDir, 'views', 'errors', '404.pug'), {pageTitle: '404'})
})


app.listen(3000)
