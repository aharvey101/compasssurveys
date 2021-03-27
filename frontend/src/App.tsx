import React, { useState, useEffect } from 'react'

type SurveysType = {
  id: number
  name: string
  question_Number: number
}

type Props = {
  id: number
  name: string
  question_Number: number
  openSurvey: (id: number) => void
}

type SurveyType = {
  id: number
  name: string
  questions: object[]
}

type LoadingState = boolean

const Survey: React.FC<Props> = ({ id, name, openSurvey }) => (
  <>
    <button
      onClick={() => {
        openSurvey(id)
      }}
    >
      {name}
    </button>
  </>
)

type QProps = {
  id: number
  title: string
  questionDescription: string
  answers: object[][]
}

const Question: React.FC<QProps> = ({
  id,
  title,
  questionDescription,
  answers,
}) => (
  <>
    <input type="checkbox" />
  </>
)

function App() {
  // on load, get data from database
  const [loading, setLoading] = useState<LoadingState>(true)
  const [surveys, setSurveys] = useState<SurveysType[]>([])
  const [surveyOpen, setSurveyOpen] = useState(false)
  const [survey, setSurvey] = useState<SurveyType>({
    questions: {
      question: 'string',
    },
  })

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
    //@ts-ignore
    getSurveys().then(setLoading(!loading)).then(console.log(surveys))
  }, [])

  const openSurvey = async (id: number) => {
    setSurveyOpen(!surveyOpen)
    try {
      const response = await fetch(`http://localhost:5000/surveys${id}`)
      const jsonData = await response.json()
      setSurvey(jsonData)
    } catch (err) {
      console.log(err.message)
    } finally {
      console.log('it done')
    }
  }

  return (
    <>
      {!loading && !surveyOpen ? <h1>Compass Surveys</h1> : <h1>{survey}</h1>}
      {!loading && !surveyOpen ? (
        surveys.map((survey) => <Survey {...survey} openSurvey={openSurvey} />)
      ) : (
        <>
          <h1>Hello Survey</h1>

          {survey.questions.map((question) => (
            <Question
              id={question.id}
              title={question.title}
              questionDescription={question.questionDescription}
              answers={question.answers}
            />
          ))}
        </>
      )}
    </>
  )
}

export default App
