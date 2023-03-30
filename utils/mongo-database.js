const {mongoose} = require('mongoose')

let db;

const connectMongoDb = () => mongoose.connect('mongodb+srv://tveryakoff:mongoDb123@online-shop-mongodb.buwgsfv.mongodb.net/?retryWrites=true&w=majority', {dbName: 'shop'}).then((mongoClient) => {
  console.log('connected to Mongo Db')
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
