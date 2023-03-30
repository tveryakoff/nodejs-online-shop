const  {getMongoDb} = require('../utils/mongo-database')
const {ObjectId} = require('mongodb')

const TABLE_NAME = 'products'

class Product {
  constructor({_id, title, price, description, imageUrl}, userId = null) {
    this.title = title;
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = _id ? new ObjectId(_id) : null
    this.userId = userId
  }

  save() {
    const db = getMongoDb()
    if (!this._id) {
      return db.collection(TABLE_NAME).insertOne(this)
    }

    return db.collection(TABLE_NAME).updateOne({_id: this._id}, {$set: this})
  }

  static fetchAll(filter) {
    const db = getMongoDb()
    return db.collection(TABLE_NAME).find(filter).toArray()
  }

  static async findById(productId) {
    const db = getMongoDb()
    return db.collection(TABLE_NAME).findOne({_id: new ObjectId(productId)})
  }

  static async deleteById(productId) {
    const db = getMongoDb()
    return db.collection(TABLE_NAME).deleteOne({_id: new ObjectId(productId)})
  }
}

// SQL

// const Product = sequelizePool.define('product',{
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   }
// })

module.exports = Product
