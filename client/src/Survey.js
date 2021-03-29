import React, { useState, useEffect } from 'react'
import { QuestionStyle } from './Survey.styles'
import { Back } from './App.styles'
import { useParams, Link } from 'react-router-dom'

const Question = ({ id, title, question, answers }) => (
  <QuestionStyle>
    <h1>{title}</h1>
    <p>{question}</p>
    <form>
      {answers.map((answer) => (
        <div className="answer" key={answer.id}>
          <input id="answer-radio" name="answer-radio" type="radio" />
          <label htmlFor="answer-radio">{answer.title}</label>
        </div>
      ))}
    </form>
  </QuestionStyle>
)

const Survey = ({ baseUrl }) => {
  const [loading, setLoading] = useState(true)
  const [survey, setSurvey] = useState()

  const getSurvey = async (id) => {
    try {
      const response = await (await fetch(`${baseUrl}${id}`)).json()
      setSurvey(response)
      setLoading(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  const { id } = useParams()

  useEffect(() => {
    getSurvey(id)
    setTimeout(() => {}, 1000)
  }, [])

  if (!loading) {
    const SurveyQuestions = survey.questions.map((question) => (
      <Question
        id={question.id}
        title={question.title}
        question={question.question}
        answers={question.answers}
      />
    ))
  }

  return (
    <>
      {!loading ? (
        <>
          <h1>{survey.name}</h1>
          {survey.questions.map((question) => (
            <Question
              id={question.id}
              title={question.title}
              question={question.question}
              answers={question.answers}
            />
          ))}

          <Link to="/">
            <Back>Back</Back>
          </Link>
        </>
      ) : null}
    </>
  )
}

export default Survey
