import React, { useState, useEffect } from 'react'
import { Wrapper, SurveyButtonStyle, Header } from './Home.styles'
import { Link } from 'react-router-dom'

const SurveyButton = ({ id, name }) => (
  <SurveyButtonStyle key={id}>
    <Link to={`/survey/${id}`}>
      <button>
        <p>{name}</p>
      </button>
    </Link>
  </SurveyButtonStyle>
)

function App({ setSurvey, baseUrl }) {
  const [loading, setLoading] = useState(true)
  const [surveys, setSurveys] = useState([])

  const getSurveys = async () => {
    try {
      console.log(`${baseUrl}surveys`)
      const response = await (
        await fetch(`${baseUrl}surveys`, {
          method: 'GET',
          mode: 'cors',
          credientials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
        })
      ).json()
      console.log(response)
      setSurveys(response)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(async () => {
    getSurveys()
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const openSurvey = async (id) => {
    console.log('opening survey')
  }

  return (
    <>
      <Wrapper>
        {surveys.length >= 1 ? (
          <>
            <Header>
              <h1>Compass Surveys</h1>
              <Link to="/createSurvey">
                <button>Create Survey</button>
              </Link>
            </Header>
            {surveys.map((survey) => (
              <SurveyButton {...survey} />
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
