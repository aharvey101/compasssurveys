require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const sql = require('sql')

// middleware
app.use(sslRedirect())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// serve client as static:
app.use(express.static(path.join(__dirname, 'public')))

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
      id: survey.rows[0].id,
      name: survey.rows[0].name,
      questions: qwa,
    }
    res.json(response)
    console.log('sending response')
  } catch (err) {
    console.log(err.message)
  }
})

// Create a survey

app.post('/createSurvey', async (req, res) => {
  const survey = req.body
  console.log('survey is,', survey)
  try {
    //Create entry in survey table
    const surveyRes = await pool.query(
      'INSERT INTO surveys (name) values ($1) RETURNING *',
      [survey.name]
    )
    console.log(surveyRes.rows)
    // then create questions with survey id,

    const questionsToPost = survey.questions.map((question) => ({
      survey_id: surveyRes.rows[0].id,
      title: question.title,
      question: question.question,
    }))
    console.log('q to post are', questionsToPost)
    const Questions = sql.define({
      name: 'questions',
      columns: ['id', 'survey_id', 'title', 'question'],
    })

    const questionQuery = Questions.insert(questionsToPost)
      .returning('*')
      .toQuery()
    const questionRes = await pool.query(questionQuery)

    console.log('questionRes is', questionRes.rows)

    //Define table for query:
    const Answers = sql.define({
      name: 'answers',
      columns: ['id', 'survey_id', 'title', 'question_id'],
    })

    //make answers object for query:
    const answersArray = survey.questions.map((question, index) => {
      const questionId = questionRes.rows[index].id
      const answers = question.answers.map((answer) => ({
        title: answer.title,
        question_id: questionId,
      }))
      return answers
    })

    // make query for answers
    const answerQuery = Answers.insert(answersArray).returning('*').toQuery()
    const answersRes = await pool.query(answerQuery)

    res.send('200')
  } catch (err) {
    console.log(err.message)
    res.send(new Error())
  }
})

// server side is admin check

app.get('/adminCheck', (req, res) => {
  const password = req.body

  if ((password = 'isAdmin')) {
    res.send(200)
  } else {
    res.send(new Error())
  }
})

module.exports = app
