const { Client, Pool } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE_URL,
})

client.connect()

process.env.NODE_ENV === 'production'
  ? (module.exports = client)
  : (module.exports = pool)
