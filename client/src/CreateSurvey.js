import React, { useState } from 'react'
import { FormWrapper } from './CreateSurvey.styles'

import { Link } from 'react-router-dom'
import { Input, Label, Button } from 'reactstrap'

const CreateSurvey = ({ baseUrl }) => {
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
    const optionsArray = Object.values(newSurvey.options)
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

    try {
      const res = await fetch(`${baseUrl}createSurvey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitObj),
      })
      window.location = '/'
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <FormWrapper>
        <h1>Create A New Survey</h1>
        {/* Input name */}
        <Label className="surveyName_label" htmlFor="surveyName">
          Survey Name
        </Label>
        <Input
          className="question_Input"
          type="text"
          name="surveyName"
          onChange={handleChangeName}
        />
        <div className="question_container">
          <Label className="question_label" htmlFor="question1">
            Question 1
          </Label>
          <Input
            className="question_Input"
            type="text"
            id="question1"
            name="Question 1"
            onChange={handleQuestion}
          />
          <div className="options">
            <Label htmlFor="option1">Option 1</Label>
            <Input
              className="question_Input"
              type="text"
              id="question1"
              onChange={handleOptionChange}
              name="question1option1"
            />
            <Label htmlFor="option2">Option 2</Label>
            <Input
              className="question_Input"
              type="text"
              id="question1"
              onChange={handleOptionChange}
              name="question1option2"
            />
            <Label htmlFor="option3">Option 3</Label>
            <Input
              className="question_Input"
              type="text"
              id="question1"
              onChange={handleOptionChange}
              name="question1option3"
            />
            <Label htmlFor="option4">Option 4</Label>
            <Input
              className="question_Input"
              type="text"
              id="question1"
              onChange={handleOptionChange}
              name="question1option4"
            />
          </div>
        </div>
        <div className="question_container">
          <Label className="question_label" htmlFor="question2">
            Question 2
          </Label>
          <Input
            className="question"
            type="text"
            id="question2"
            name="Question 2"
            onChange={handleQuestion}
          />
          <div className="options">
            <Label className="option_Label" htmlFor="option1">
              Option 1
            </Label>
            <Input
              className="option_Input"
              type="text"
              id="question2"
              onChange={(e) => handleOptionChange(e)}
              name="question2option1"
            />
            <Label className="option_Label" htmlFor="option2">
              Option 2
            </Label>
            <Input
              type="text"
              id="question2"
              onChange={(e) => handleOptionChange(e)}
              name="question2option2"
            />
            <Label className="option_Label" htmlFor="option3">
              Option 3
            </Label>
            <Input
              type="text"
              id="question2"
              onChange={(e) => handleOptionChange(e)}
              name="question2option3"
            />
            <Label className="option_Label" htmlFor="option4">
              Option 4
            </Label>
            <Input
              type="text"
              id="question2"
              onChange={(e) => handleOptionChange(e)}
              name="question2option4"
            />
          </div>
        </div>
        <div className="question_container">
          <Label className="question_label" htmlFor="question3">
            Question 3
          </Label>
          <Input
            className="question"
            type="text"
            id="question3"
            name="Question 3"
            onChange={handleQuestion}
          />
          <div className="options">
            <Label className="option_Label" htmlFor="option1">
              Option 1
            </Label>
            <Input
              className="option_Input"
              type="text"
              id="question3"
              onChange={(e) => handleOptionChange(e)}
              name="question3option1"
            />
            <Label className="option_Label" htmlFor="option2">
              Option 2
            </Label>
            <Input
              type="text"
              id="question3"
              onChange={(e) => handleOptionChange(e)}
              name="question3option2"
            />
            <Label className="option_Label" htmlFor="option3">
              Option 3
            </Label>
            <Input
              type="text"
              id="question3"
              onChange={(e) => handleOptionChange(e)}
              name="question3option3"
            />
            <Label className="option_Label" htmlFor="option4">
              Option 4
            </Label>
            <Input
              type="text"
              id="question3"
              onChange={(e) => handleOptionChange(e)}
              name="question3option4"
            />
          </div>
        </div>
        <div className="form-buttons">
          <Link to="/">
            <Button className="backButton">Back</Button>
          </Link>
          <Link to="/">
            <Button className="submitButton" onClick={submit}>
              Submit
            </Button>
          </Link>
        </div>
      </FormWrapper>
    </>
  )
}

export default CreateSurvey
