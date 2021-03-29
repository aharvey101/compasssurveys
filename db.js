const Pool = require('pg').Pool

const poolEnv =
  process.env.NODE_ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: process.env.DB_USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT,
        database: process.env.DATABASE_URL,
      }

const pool = new Pool({
  ...poolEnv,
})

module.exports = pool
