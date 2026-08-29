// database/db.js
// MySQL connection pool using mysql2

const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'gymforge_db',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

// Promisify for async/await usage
const db = pool.promise();

module.exports = db;
