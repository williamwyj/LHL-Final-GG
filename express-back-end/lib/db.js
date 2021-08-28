const dotenv = require('dotenv').config();

console.log(process.env.PG_URL)
let dbParams = {};
if (process.env.PG_URL) {
  dbParams.connectionString = process.env.PG_URL;
} else {
  dbParams = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_NAME
  };
}

module.exports = dbParams;
