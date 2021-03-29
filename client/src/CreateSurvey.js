import React, { useState } from 'react'

import { FormWrapper, Submit } from './CreateSurvey.styles'
import { Back } from './App.styles'
import { Link } from 'react-router-dom'

const CreateSurvey = (props) => {
  const [newSurvey, setNewSurvey] = useState({})

  const handleChangeName = (e) => {
    setNewSurvey((ps) => ({
      ...ps,
      [e.target.name]: e.target.value,
    }))
  }

  const handleQuestion = (e) => {
    const questionId = e.target.id
    const questionTitle = e.target.name
    const question = e.target.value
    setNewSurvey((ps) => ({
      ...ps,
      questions: {
        ...ps.questions,
        [questionId]: {
          title: questionTitle,
          question: question,
          questionId: questionId,
        },
      },
    }))
  }
  const handleOptionChange = (e) => {
    const title = e.target.value
    const questionId = e.target.id
    const option = e.target.name
    setNewSurvey((ps) => ({
      ...ps,
      options: {
        ...ps.options,
        [option]: {
          title: title,
          questionId: questionId,
        },
      },
    }))
  }

  const makeSubmitObject = async (e) => {
    const questionsArray = Object.values(newSurvey.questions)
    console.log('questionsArray is', questionsArray)
    const optionsArray = Object.values(newSurvey.options)
    console.log(optionsArray)

    const newQuestions = questionsArray.map((question) => {
      const newObj = {
        title: question.title,
        question: question.question,
        answers: optionsArray.filter(
          (option) => option.questionId === question.questionId
        ),
      }

      return newObj
    })

    const survey = {
      name: newSurvey.surveyName,
      questions: newQuestions,
    }
    return survey
  }
  const submit = async (e) => {
    e.preventDefault()
    const submitObj = await makeSubmitObject()
    console.log(submitObj)
    const url =
      process.env.NODE_ENV === 'production'
        ? '/createSurvey'
        : 'http://localhost:5000/createSurvey'
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitObj),
      })

      console.log(res)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <FormWrapper>
        <h1>Create A New Survey</h1>
        {/* input name */}
        <label className="question_label" htmlFor="surveyName">
          SurveyName
        </label>
        <input
          className="question_input"
          type="text"
          name="surveyName"
          onChange={handleChangeName}
        />
        <label htmlFor="question1">Question 1</label>
        <input
          className="question_input"
          type="text"
          id="question1"
          name="Question 1"
          onChange={handleQuestion}
        />
        <div className="options">
          <label htmlFor="option1">Option 1</label>
          <input
            className="question_input"
            type="text"
            id="question1"
            onChange={(e) => handleOptionChange(e, 'question1')}
            name="question1option1"
          />
          <label htmlFor="option2">Option 2</label>

          <input
            className="question_input"
            type="text"
            id="question1"
            onChange={(e) => handleOptionChange(e, 'question1')}
            name="question1option2"
          />
        </div>
        <label className="label" htmlFor="question2">
          Question 2
        </label>
        <input
          className="question"
          type="text"
          id="question2"
          name="Question 2"
          onChange={handleQuestion}
        />
        <div className="options">
          <label className="option_label" htmlFor="option1">
            Option 1
          </label>
          <input
            className="option_input"
            type="text"
            id="question2"
            onChange={(e) => handleOptionChange(e)}
            name="question2option1"
          />
          <label htmlFor="option2">Option 2</label>
          <input
            type="text"
            id="question2"
            onChange={(e) => handleOptionChange(e)}
            name="question2option2"
          />
          <label htmlFor="option3">Option 3</label>
          <input
            type="text"
            id="question2"
            onChange={(e) => handleOptionChange(e)}
            name="question2option3"
          />
          <label htmlFor="option4">Option 4</label>
          <input
            type="text"
            id="question2"
            onChange={(e) => handleOptionChange(e)}
            name="question2option4"
          />
        </div>
        <div className="form-buttons">
          <Link to="/">
            <Back>Back</Back>
          </Link>
          <Submit onClick={submit}>Submit</Submit>
        </div>
      </FormWrapper>
    </>
  )
}

export default CreateSurvey
