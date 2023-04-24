const {mongoose} = require('mongoose')
const session = require("express-session");
const MongoDbSessionStore = require('connect-mongodb-session')(session)

const URI = 'mongodb+srv://tveryakoff:mongoDb123@online-shop-mongodb.buwgsfv.mongodb.net'
const DB_NAME = 'shop'

const connectMongoDb = () => mongoose.connect(`${URI}/?retryWrites=true&w=majority`, {dbName: DB_NAME}).then((mongoClient) => {
  console.log('connected to Mongo Db')
}).catch(e => {
  console.log('Error during connection to mongo db', e)
})

const mongoDbSessionStore = new MongoDbSessionStore({
  uri: URI,
  databaseName: DB_NAME,
  collection: 'sessions'
});




module.exports = {
  connectMongoDb,
  mongoDbSessionStore
}
