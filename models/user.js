const Sequelize = require('sequelize')

const sequelizePool = require('../utils/database')

const User = sequelizePool.define('user', {
  id: {
    type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true
  }, name: {
    type: Sequelize.STRING, allowNull: false,
  }, email: {
    type: Sequelize.STRING, allowNull: false,
  }
})

module.exports = User
