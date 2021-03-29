import React, { useState, useEffect } from 'react'
import { QuestionStyle } from './Survey.styles'
import { Back } from './App.styles'
import { useParams, Link } from 'react-router-dom'
import { mockData } from './mockData'

const Question = ({ id, title, question, answers }) => (
  <QuestionStyle>
    <h1>{title}</h1>
    <p>{question}</p>

    <form>
      {answers.map((answer) => (
        <div className="answer" key={answer.id}>
          <input
            className="answer_input"
            id="answer-radio"
            name="answer-radio"
            type="radio"
          />
          <label className="answer_label" htmlFor="answer-radio">
            {answer.title}
          </label>
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
      const response = await (await fetch(`${baseUrl}surveys/${id}`)).json()
      setSurvey(response)
      setLoading(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  const { id } = useParams()
  // FOR USE IN PROD ONLY
  // useEffect(() => {
  //   getSurvey(id)
  //   setTimeout(() => {}, 1000)
  // }, [])

  // with Mock Data for netlify
  useEffect(() => {
    // find survey in array

    const survey = mockData.surveys.filter((survey) => survey.id === Number(id))

    setSurvey(survey[0])
    setLoading(false)
  }, [])

  return (
    <>
      {!loading ? (
        <>
          <h1>{survey.name}</h1>
          {survey.questions.map((question) => (
            <Question
              key={question.id}
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
      ) : (
        <h1>Loading</h1>
      )}
    </>
  )
}

export default Survey
