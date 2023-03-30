const SequelizeLib = require('sequelize')
const sequelize = require("../utils/sql-database");

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: SequelizeLib.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true,
  },
  count: {
    type: SequelizeLib.INTEGER,
    allowNull: false
  }
})

module.exports = OrderItem
