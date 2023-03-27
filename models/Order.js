const SequelizeLib = require("sequelize")
const sequelize = require('../utils/database')

class Order extends SequelizeLib.Model {

}

module.exports = Order.init({
  id: {
    type: SequelizeLib.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true,
  },

}, {modelName: 'order', sequelize})
