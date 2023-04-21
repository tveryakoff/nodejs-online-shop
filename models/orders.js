const {Schema, model} = require('mongoose')
const {orderCollection, userCollection} = require('./constants')

const orderSchema = new Schema({
  products: [{
    productData: {type: Object, required: true},
    count: {type: Number, required: true}
  }],
  totalPrice: {
    type: Number
  },
  user: {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: userCollection
    }
  }
})

const orderModel = model(orderCollection, orderSchema)

module.exports = orderModel
