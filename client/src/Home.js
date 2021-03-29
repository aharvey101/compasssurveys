import React, { useState, useEffect } from 'react'
import { Wrapper, SurveyButtonStyle, Header } from './Home.styles'
import { Link } from 'react-router-dom'

const SurveyButton = ({ id, name, openSurvey }) => (
  <SurveyButtonStyle key={id}>
    <Link to={`/survey/${id}`}>
      <button
        onClick={() => {
          openSurvey(id)
        }}
      >
        <p>{name}</p>
      </button>
    </Link>
  </SurveyButtonStyle>
)

function App({ setSurvey, baseUrl }) {
  const [loading, setLoading] = useState(true)
  const [surveys, setSurveys] = useState({})

  const getSurveys = async () => {
    try {
      console.log(`${baseUrl}surveys`)
      const response = await (await fetch(`${baseUrl}surveys`)).json()
      setSurveys(response)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getSurveys()
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const openSurvey = async (id) => {
    console.log('opening survey')
  }

  return (
    <>
      <Wrapper>
        {!loading ? (
          <>
            <Header>
              <h1>Compass Surveys</h1>
              <Link to="/createSurvey">
                <button>Create Survey</button>
              </Link>
            </Header>
            {surveys.map((survey) => (
              <SurveyButton
                {...survey}
                openSurvey={() => openSurvey(survey.id).then(setLoading(false))}
              />
            ))}
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </Wrapper>
    </>
  )
}

export default App
