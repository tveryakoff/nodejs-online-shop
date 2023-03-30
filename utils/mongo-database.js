const {MongoClient} = require('mongodb')

let db;

const connectMongoDb = () => MongoClient.connect('mongodb+srv://tveryakoff:mongoDb123@online-shop-mongodb.buwgsfv.mongodb.net/?retryWrites=true&w=majority').then((mongoClient) => {
  console.log('connected to Mongo Db')
  db = mongoClient.db('online-shop')
}).catch(e => {
  console.log('Error during connection to mongo db', e)
})

const getMongoDb = () => {
  if (db) {
    return db
  }

  else {
    throw('No mongo DB')
  }
}

module.exports = {
  connectMongoDb,
  getMongoDb,
}
