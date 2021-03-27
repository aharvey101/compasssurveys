import React, { useState, useEffect } from 'react'
import {
  GlobalStyle,
  Wrapper,
  SurveyButtonStyle,
  QuestionStyle,
} from './App.styles'

const Survey = ({ id, name, openSurvey }) => (
  <SurveyButtonStyle>
    <button
      onClick={() => {
        openSurvey(id)
      }}
    >
      <p>{name}</p>
    </button>
  </SurveyButtonStyle>
)

const Question = ({ id, title, questionDescription, answers }) => (
  <QuestionStyle>
    <h1>{title}</h1>
    <p>{questionDescription}</p>
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

function App() {
  // on load, get data from database
  const [loading, setLoading] = useState(true)
  const [surveys, setSurveys] = useState([])
  const [surveyOpen, setSurveyOpen] = useState(false)
  const [survey, setSurvey] = useState({})

  const getSurveys = async () => {
    try {
      const response = await (
        await fetch('http://localhost:5000/surveys')
      ).json()
      setSurveys(response)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getSurveys().then(setLoading(!loading))
    setLoading(!loading)
  }, [])

  const openSurvey = async (id) => {
    console.log('surveyId =', id)
    setSurveyOpen(!surveyOpen)
    setLoading(!loading)
    try {
      const response = await (
        await fetch(`http://localhost:5000/surveys/${id}`)
      ).json()
      setSurvey(response)
    } catch (err) {
      console.log(err.message)
    }
  }

  const back = () => {
    setSurvey({})
    setSurveyOpen(!surveyOpen)
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {/* If survey is not open, return the ' home page' */}
        {!loading && !surveyOpen ? (
          <>
            <h1>Compass Surveys</h1>
            {surveys.map((survey) => (
              <div key={survey.id}>
                <Survey
                  {...survey}
                  openSurvey={() =>
                    openSurvey(survey.id).then(setLoading(false))
                  }
                />
              </div>
            ))}
          </>
        ) : surveyOpen && survey.id ? (
          <>
            {/* if Survey is open, show survey */}
            <h1>{survey.name}</h1>
            {survey.questions.map((question) => (
              <Question key={question.id} {...question} />
            ))}
            <button className="backButton" onClick={back}>
              Back
            </button>
          </>
        ) : null}
      </Wrapper>
    </>
  )
}

export default App
