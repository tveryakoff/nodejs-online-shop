const express = require('express')
const {shopRoutes, adminRouts} = require('./routing')

const app = express()

app.use(express.urlencoded({extended: true}))

app.use('/admin', adminRouts)
app.use(shopRoutes)

app.use((req,res,next) => {
  res.status(404).send(`<h1>Page not found</h1>`)
})


app.listen(3000)
