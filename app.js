require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

// middleware
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// GET all surveys
app.get('/surveys', async (req, res) => {
  try {
    // get surveys
    const allSurveys = await pool.query('SELECT * FROM surveys')
    res.json(allSurveys.rows)
    console.log('sending surveys')
  } catch (err) {
    console.log(err.message)
  }
})

// Get A survey
app.get('/surveys/:id', async (req, res) => {
  try {
    //get a specific survey
    const { id } = req.params
    const survey = await pool.query('SELECT * FROM surveys WHERE id = $1', [id])
    // get those surveys questions
    const questions = await pool.query(
      'SELECT * FROM questions WHERE survey_id = $1',
      [survey.rows[0].id]
    )
    // get all answers to the questions
    const answers = await pool.query('SELECT * FROM answers')

    const qwa = questions.rows.map((question) => {
      const q = {
        id: question.id,
        title: question.title,
        questionDescription: question.questiondescription,
        answers: answers.rows.filter(
          (answer) => answer.question_id === question.id
        ),
      }
      return q
    })
    const response = {
      survey: {
        id: survey.rows[0].id,
        name: survey.rows[0].name,
        questions: qwa,
      },
    }
    res.json(response)
    console.log('sending response')
  } catch (err) {
    console.log(err.message)
  }
})

module.exports = app
