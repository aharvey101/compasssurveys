import React, { useState, useEffect } from 'react'
import { Wrapper, SurveyButtonStyle } from './Home.styles'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

const SurveyButton = ({ id, name }) => (
  <SurveyButtonStyle key={name}>
    <Link to={`/survey/${id}`}>
      <button>
        <p>{name}</p>
      </button>
    </Link>
  </SurveyButtonStyle>
)

function App({ baseUrl }) {
  const [loading, setLoading] = useState(true)
  const [surveys, setSurveys] = useState([])

  const getSurveys = async () => {
    try {
      const response = await (
        await fetch(`${baseUrl}surveys`, {
          method: 'GET',
          mode: 'cors',
          credientials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
        })
      ).json()
      setSurveys(response)
      return true
    } catch (err) {
      console.error(err.message)
    }
  }
  // for real backend
  useEffect(async () => {
    const res = await getSurveys()
    if (res) {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <Wrapper>
        {!loading ? (
          <>
            <h1>Compass Surveys</h1>

            {surveys.map((survey) => (
              <SurveyButton {...survey} />
            ))}
            <Link className="create_survey" to="/createSurvey">
              <Button className="create_survey_button" color="primary">
                Create Survey
              </Button>
            </Link>
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </Wrapper>
    </>
  )
}

export default App
