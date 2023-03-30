const {Schema, model} = require('mongoose')
const {userCollection, productCollection} = require('./constants')


const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  imageUrl: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: userCollection,
    required: true
  }
})

module.exports = {Product: model(productCollection, productSchema)}
