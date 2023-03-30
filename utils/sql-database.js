const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('onlineshop', 'root', 'password1aAb', {dialect: 'mysql', host: 'localhost'})

module.exports = sequelize
