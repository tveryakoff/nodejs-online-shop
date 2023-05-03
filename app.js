require('dotenv').config();

const express = require('express')
const csurf = require('csurf')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const {shopRoutes, adminRouts} = require('./routing')
const path = require('path')
const rootDir = require('./constants/rootDir')
const errorController = require('./controllers/error')
const {connectMongoDb} = require('./utils/mongo-database')
const {requireAuth, session, addData} = require('./middlewares/auth')
const {authRoutes} = require("./routing/auth");
const errorRoutes = require("./routing/error");
const errorMiddleware = require('./middlewares/error')


const app = express()

app.set('view engine', 'pug');

// Already default folder
app.set('views', 'views')

const csrfProtection = csurf({cookie: true})

app.use(express.static(path.join(rootDir, 'public')))
app.use(express.urlencoded({extended: true}))

app.use(session)
app.use(cookieParser())
app.use(csrfProtection)
app.use(flash())
app.use(addData)
app.use('/admin', requireAuth, adminRouts)
app.use(shopRoutes)
app.use(authRoutes)
app.use('/error', errorRoutes)
app.use(errorMiddleware)

app.use(errorController.get404)

connectMongoDb().then(() => {
  app.listen(3000)
})

