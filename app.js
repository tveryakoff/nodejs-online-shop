const express = require('express')
const {shopRoutes, adminRouts} = require('./routing')
const path = require('path')
const rootDir = require('./constants/rootDir')
const errorController = require('./controllers/error')
const {connectMongoDb} = require('./utils/mongo-database')
const {requireAuth, session, addData} = require('./middlewares/auth')
const {authRoutes} = require("./routing/auth");

const app = express()

app.set('view engine', 'pug');

// Already default folder
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(rootDir, 'public')))

app.use(session)
app.use(addData)
app.use('/admin', requireAuth, adminRouts)
app.use(shopRoutes)
app.use(authRoutes)

app.use(errorController.get404)

connectMongoDb().then(() => {
  app.listen(3000)
})

