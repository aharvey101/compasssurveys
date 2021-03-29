require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const path = require('path')
const sql = require('sql')

pool.connect().then(console.log('connected to db'))

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
const surveys = require('./routes/surveys')

// use routes
app.use('/api', surveys)

// if in production, serve build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

module.exports = app
