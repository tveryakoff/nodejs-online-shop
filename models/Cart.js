// const SequelizeLib = require('sequelize')
// const sequelize = require('../utils/sql-database')
//
// class Cart extends SequelizeLib.Model {
//   async addOneProduct(product) {
//     let count = 1
//     const cartProducts = await this.getProducts({where: {id: product.id}})
//     if (cartProducts?.length && cartProducts[0]) {
//       const product = cartProducts[0]
//       count = product.cartItem.count + 1
//     }
//
//     // Create new product through 3 table or update product.cartItem count property
//     return this.addProduct(product, {through: {count}})
//   }
//
//
//   // lower count or remove product from cart
//   async removeOneProduct(productId) {
//     const cartProducts = await this.getProducts({where: {id: productId}})
//     if (cartProducts?.length && cartProducts[0]) {
//       const product = cartProducts[0]
//       let count = product.cartItem.count
//       if (count === 1) {
//         return product.cartItem.destroy()
//       }
//
//       return this.addProduct(product, {through: {count: count - 1}})
//     }
//   }
// }
//
// module.exports = Cart.init({
//   id: {
//     type: SequelizeLib.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true,
//   }
// }, {sequelize, modelName: 'cart',})
//
//
