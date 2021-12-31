const path = require('path');
const mysql = require('mysql');

try {
  require('dotenv').config({path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)});
}catch(err) {
  //dotenv file will not be used in production
}

const sqlPool = new mysql.createPool({
  'host': process.env.HOST,
  'user': process.env.USER,
  'password': process.env.PASSWORD,
  'port': process.env.DB_PORT,
  'database': process.env.DATABASE
});

module.exports = sqlPool;