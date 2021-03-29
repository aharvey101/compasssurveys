const { Client, Pool } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

client.query(
  'SELECT table_schema,table_name FROM information_schema.tables;',
  (err, res) => {
    if (err) throw err
    for (let row of res.rows) {
      console.log(JSON.stringify(row))
    }
    client.end()
  }
)

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE_URL,
})

process.env.NODE_ENV === 'production'
  ? (module.exports = client)
  : (module.exports = pool)
