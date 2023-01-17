const http = require('http')
const express = require('express')

const app = express()

const server = http.createServer(app);

app.use((req, res, next) => {
  console.log('inside middleware')
  next()
})

server.listen(3000);
