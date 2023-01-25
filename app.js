const express = require('express')
const {shopRoutes, adminRouts} = require('./routing')
const path = require('path')
const rootDir = require('./constants/rootDir')

const app = express()

app.use(express.urlencoded({extended: true}))

app.use('/admin', adminRouts)
app.use(shopRoutes)

app.use((req,res,next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', 'errors', '404.html'))
})


app.listen(3000)
