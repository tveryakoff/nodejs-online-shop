const express = require('express')
const {shopRoutes, adminRouts, userRouts} = require('./routing')
const path = require('path')
const rootDir = require('./constants/rootDir')
const errorController = require('./controllers/error')
const initDb = require('./models/initDb')
const auth = require('./middlewares/auth')

const app = express()

app.set('view engine', 'pug');

// Already default folder
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(rootDir, 'public')))

app.use(auth)

app.use('/admin', adminRouts)
app.use('/users', userRouts)
app.use(shopRoutes)

app.use(errorController.get404)

initDb().then(() => {
  app.listen(3000)
})

