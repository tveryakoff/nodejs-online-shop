const  {getMongoDb} = require('../utils/mongo-database')
const {ObjectId} = require('mongodb')

const TABLE_NAME = 'orders'

class Order {
  constructor({items, totalPrice, userId}) {
    this.items = items
    this.totalPrice = totalPrice
    this.userId = userId
  }

  async save() {
    const db = getMongoDb()
    if (!this.items?.length) {
      return
    }

    return db.collection(TABLE_NAME).insertOne(this)

  }

  static async fetchAll(filter) {
    const db = getMongoDb()
    return db.collection(TABLE_NAME).find(filter).toArray()
  }

  static fetchById(orderId) {
    const db = getMongoDb()
    return db.collection(TABLE_NAME).findOne({_id: new ObjectId(orderId)})
  }

}

module.exports = Order
