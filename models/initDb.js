// const sequelize = require("../utils/sql-database");
//
// const Product = require('./product')
// const User = require('./user')
//
// const Cart = require('./Cart')
// const CartItem = require('./Cart-item')
//
// const Order = require('./Order')
// const OrderItem = require('./Order-item')

// SQL

// const defineRelations = () => {
//   User.hasMany(Product)
//   User.hasOne(Cart)
//   User.hasOne(Order)
//
//   // Many to many between Cart and Product using third table CartItem
//   Cart.belongsToMany(Product, {through: CartItem})
//   Product.belongsToMany(Cart, {through: CartItem})
//   Order.belongsToMany(Product, {through: OrderItem})
//   Product.belongsToMany(Order, {through: OrderItem})
//
// }

// const syncDb = async () => {
//   defineRelations()
//
//   // Recreate all tables
//   // return sequelize.sync({force: true})
//   return sequelize.sync()
//
// }
//
// const initSqlDB = async () => {
//   await syncDb()
//   const [user] = await User.findOrCreate({
//     where: {name: 'anonim', email: 'anonimus@test.com'}, defaults: {name: 'anonim', email: 'anonimus@test.com'}
//   })
//   const userCart = await user.getCart()
//   if (!userCart) {
//     await user.createCart()
//   }
// }
//
// // MONGO
//
//
// module.exports = {
//   initSqlDB,
// }


