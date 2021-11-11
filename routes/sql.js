// const path = require('path');
// require('dotenv').config({path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)});
const mysql = require('mysql');

const sqlPool = new mysql.createPool({
  'host': process.env.HOST,
  'user': process.env.USER,
  'password': process.env.PASSWORD,
  'port': process.env.DB_PORT,
  'database': process.env.DATABASE
});

module.exports = sqlPool;