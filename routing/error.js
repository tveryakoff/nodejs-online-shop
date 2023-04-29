const express = require('express')
const {get500} = require("../controllers/error");

const Router = express.Router

const errorRoutes = new Router()

errorRoutes.get('/500', get500)

module.exports = errorRoutes
