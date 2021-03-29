const router = require('express').Router()
const pool = require('../db.js')
const sql = require('sql')

// GET all surveys
router.get('/surveys', async (req, res) => {
  try {
    // get surveys
    const allSurveys = await pool.query('SELECT * FROM surveys')
    res.json(allSurveys.rows)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Unable to get surveys' })
  }
})

// Get A survey
router.get('/surveys/:id', async (req, res) => {
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
    // build question with answers array
    const qwa = questions.rows.map((question) => {
      const q = {
        id: question.id,
        title: question.title,
        question: question.question,
        answers: answers.rows.filter(
          (answer) => answer.question_id === question.id
        ),
      }
      return q
    })
    // build response array
    const response = {
      id: survey.rows[0].id,
      name: survey.rows[0].name,
      questions: qwa,
    }
    res.json(response)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Unable to get this survey' })
  }
})

// Create a survey

router.post('/createSurvey', async (req, res) => {
  const survey = req.body

  try {
    //insert survey table
    const surveyRes = await pool.query(
      'INSERT INTO surveys (name) values ($1) RETURNING *',
      [survey.name]
    )
    // then insert questions with survey id,
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

    // Then insert answers for questions
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

    res
      .status(200)
      .json({ messsage: 'Sucessfully added survey to the database!' })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Unable to add lesson' })
  }
})

module.exports = router
