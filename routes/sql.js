require('dotenv').config();
const mysql = require('mysql');

const sqlPool = new mysql.createPool({
  'connectionLimit': 10,
  'host': process.env.HOST,
  'user': process.env.USER,
  'password': process.env.PASSWORD,
  'port': process.env.DB_PORT,
  'database': process.env.DATABASE
});

// try {
//   sql.connect(() => {
//     console.log("connected to database");
//   })
// }
// catch(error) {
//     console.log('error when connecting to db:', error);
// }

module.exports = sqlPool;