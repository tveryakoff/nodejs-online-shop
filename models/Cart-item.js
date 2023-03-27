const SequelizeLib = require('sequelize')
const sequelize = require("../utils/database");

const CartItem = sequelize.define('cartItem', {
  id: {
    type: SequelizeLib.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true,
  },
  count: {
    type: SequelizeLib.INTEGER,
    allowNull: false
  }
})

module.exports = CartItem
