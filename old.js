// sample req data:
const data = {
  name: 'Animal Survey 2',
  //
  questions: [
    {
      id: 20,
      title: 'Question 1',
      questionDescription: 'Roughly how many kangaroos live in Australia?',
      answers: [
        {
          title: '10m',
          question_id: 1,
        },
        {
          title: '20m',
          question_id: 1,
        },
        {
          title: '25m',
          question_id: 1,
        },
        {
          title: '50m',
          question_id: 1,
        },
      ],
    },
  ],
}

// Frontend functionality
// onClick new survey, create new survey, survey request new survey, and pass through ID to create survey page
// onClick new question, craete new question in DB and pass back ID
// onClick

// survey Data:
const survey = {
  name: 'Animal Survey',
}

// create survey route:

app.post('/createsurvey', async (req, res) => {
  const survey = req.body
  try {
    const response = await pool.query(
      'INSERT INTO surveys (name) values ($1) RETURNING *',
      [survey.name]
    )
    res.json(response.rows)
  } catch (err) {
    console.log(err.message)
  }
})

const questions = {
  survey_id: 1,
  title: 'Question 1',
  question: 'Is the earth flat?',
}

app.post('/createQuestion', async (req, res) => {
  const question = req.body
  try {
    const response = await pool.query(
      'INSERT INTO questions (survey_id, title, question) values ($1,$2,$3) RETURNING *',
      [question.survey_id, question.title, question.question]
    )
    res.send(response.rows)
  } catch (err) {
    console.log(err.message)
  }
})

const answers = [
  { question_id: 1, title: 'yes' },
  { question_id: 1, title: 'no' },
  { question_id: 1, title: 'maybe' },
  { question_id: 1, title: 'some people say yes' },
]

app.post('/createAnswers', async (req, res) => {
  const answers = req.body.answers

  answers.map(async (answer) => {
    try {
      const response = await pool.query(
        'INSERT INTO answers (question_id, title) values ($1, $2) RETURNING *',
        [answer.question_id, answer.title]
      )
      res.json({
        Message: 'Answers succesfully created',
      })
    } catch (err) {
      console.log(err.message)
    }
  })
})

const questionsRes = await survey.questions.map(async (question) => {
  const resp = await pool.query(
    'INSERT INTO questions (survey_id, title, question) values ($1, $2, $3)RETURNING *',
    [surveyRes.rows[0].id, question.title, question.question]
  )

  return res
})
