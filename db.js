const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  password: 'password1',
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
})

module.exports = pool
