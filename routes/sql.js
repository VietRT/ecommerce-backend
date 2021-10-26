require('dotenv').config();
const mysql = require('mysql');

const sql = new mysql.createConnection({
  'host': process.env.HOST,
  'user': process.env.USER,
  'password': process.env.PASSWORD,
  'port': process.env.PORT,
  'database': process.env.DATABASE
});

try {
  sql.connect(() => {
    console.log("connected to database");
  })
}
catch(error) {
    console.log('error when connecting to db:', err.code);
}

module.exports = sql;