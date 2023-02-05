const mysql = require("mysql2");

const pool = mysql.createPool({
  host: 'localhost',
  database: 'onlineshop',
  user: 'root',
  password: 'password1aAb'
})

module.exports = pool.promise()
