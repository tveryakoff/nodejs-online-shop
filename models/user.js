const {Product} = require('./product')
const {userCollection, productCollection} = require('./constants')

const { Schema, model} = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      cartProductId: {
        type: Schema.Types.ObjectId,
        ref: productCollection
      },
      count: Number
    }],
    totalPrice: Number
  }
})

userSchema.methods.addProductToCart = async function addProductToCart(productId) {
  const cart = this?.cart?.items?.length ? this.cart : {
    items: [],
    totalPrice: 0
  }
  const itemIndex = cart.items.findIndex((product) => product.cartProductId.toString() === productId.toString())

  if (itemIndex === -1) {
    cart.items.push({
      cartProductId: productId,
      count: 1
    })
  }

  else {
    cart.items[itemIndex].count += 1
    cart.items[itemIndex].save()
  }

  const product = await Product.findById(productId)
  cart.totalPrice = parseInt(cart.totalPrice,10)+ parseInt(product.price,10)

  this.cart = cart
  return this.save()
}

userSchema.methods.removeProductFromCart = async function removeProductFromCart(productId) {
    if (!this.cart) {
      return
    }

    let {items, totalPrice} = this.cart

    const productInCardIndex = items.findIndex(p => p.cartProductId.toString() === productId.toString())

    if (productInCardIndex === -1) {
      return
    }
    if (items[productInCardIndex].count === 1) {
      items = items.filter(i => i.cartProductId.toString() !== productId.toString())
    }

    else {
      items[productInCardIndex].count -= 1
    }

    const product = await Product.findById(productId)
    totalPrice -= product.price

    this.cart.items = items
    this.cart.totalPrice = totalPrice

    return this.save()
  }

// class User {
//   constructor({_id, name, email, cart}) {
//     this.name = name;
//     this.email = email
//     this._id = _id
//     this.cart = cart || {
//       items: [],
//       totalPrice: 0
//     }
//   }
//
//   save() {
//     const db = getMongoDb()
//     return db.collection(TABLE_NAME).insertOne(this)
//   }
//
//   async addProductToCart(productId) {
//     const db = getMongoDb()
//     const user = await User.findById(this._id)
//     const cart = user?.cart || {
//       items: [],
//       totalPrice: 0
//     }
//     const itemIndex = cart.items.findIndex((product) => product._id === productId)
//
//     if (itemIndex === -1) {
//       cart.items.push({
//         _id: productId,
//         count: 1
//       })
//     }
//
//     else {
//       cart.items[itemIndex] = {
//         ...cart.items[itemIndex],
//         count: cart.items[itemIndex].count + 1
//       }
//     }
//
//     const product = await Product.findById(productId)
//     cart.totalPrice = parseInt(cart.totalPrice,10)+ parseInt(product.price,10)
//
//     return db.collection(TABLE_NAME).updateOne({_id: new ObjectId(this._id)}, {$set: {cart}})
//   }
//
//   async removeProductFromCart(productId) {
//     const db = getMongoDb()
//
//     const user = await User.findById(this._id)
//     if (!user.cart) {
//       return
//     }
//
//     let {items, totalPrice} = user.cart
//
//     const productInCardIndex = items.findIndex(p => p._id.toString() === productId.toString())
//
//     if (productInCardIndex === -1) {
//       return
//     }
//     if (items[productInCardIndex].count === 1) {
//       items = items.filter(i => i._id.toString() !== productId.toString())
//     }
//
//     else {
//       items[productInCardIndex].count -= 1
//     }
//
//     const product = await Product.findById(productId)
//     totalPrice = user.cart.totalPrice
//     totalPrice -= product.price
//
//     db.collection(TABLE_NAME).updateOne({_id: new ObjectId(this._id)}, {$set: {cart: {totalPrice, items}}})
//   }
//
//   async getCart() {
//     const user = await User.findById(this._id)
//     if (!user) {
//       return []
//     }
//
//     if (!user.cart) {
//       user.cart = {
//         items: [],
//         totalPrice: 0
//       }
//     }
//
//     const cartProductList = user?.cart?.items || []
//     const productIds = cartProductList.map(p => new ObjectId(p._id))
//
//     const productsWithData = await Product.fetchAll({_id: {$in: productIds}})
//
//     const productList = cartProductList.map(cartProduct => {
//       const productWithData = productsWithData.find(p => p._id.toString() === cartProduct._id.toString())
//       return {
//         ...productWithData,
//         count: cartProduct.count
//       }
//     })
//
//     return {
//       productList,
//       totalPrice: user.cart.totalPrice
//     }
//   }
//
//   clearCart() {
//     const db = getMongoDb()
//     return db.collection(TABLE_NAME).updateOne({_id: new ObjectId(this._id)}, {$set: {cart: {items: [], totalPrice: 0}}})
//   }
//
//   async createOrder() {
//     const user = await User.findById(this._id)
//     if (!user) {
//       return
//     }
//
//     const cart = await this.getCart()
//
//     const order = new Order({items: cart?.productList, totalPrice: cart?.totalPrice, userId: this._id})
//     const document = await order.save()
//
//     await this.clearCart()
//
//     return document.insertedId
//   }
//
//   async getOrders() {
//     return Order.fetchAll({userId: new ObjectId(this._id)})
//   }
//
//   static findById(userId) {
//     const db = getMongoDb()
//     return db.collection(TABLE_NAME).findOne({_id: new ObjectId(userId)})
//   }
// }

// const User = sequelizePool.define('user', {
//   id: {
//     type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true
//   }, name: {
//     type: Sequelize.STRING, allowNull: false,
//   }, email: {
//     type: Sequelize.STRING, allowNull: false,
//   }
// })

module.exports = {
  User: model(userCollection, userSchema),
  collection: userCollection
}
