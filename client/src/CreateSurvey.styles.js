import styled from 'styled-components'

export const FormWrapper = styled.form`
  margin: 0 auto;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* color: red; */

  .options {
    display: flex;
    flex-direction: column;
  }

  .form-buttons {
    margin: 1em;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    /* align-items:  */
    /* gap: 2em; */
  }

  .backButton {
    background-color: #f2c94c;
    border-radius: 0.4em;
    border-color: #f2c94c;
    margin-top: 1em;
    padding: 0.5em 1em 0.5em 1em;
    color: black;
    outline: none;

    filter: drop-shadow(5px 5px 10px rgba(5, 5, 5, 0.2));
    :hover {
      background: #f6de94;
    }
  }

  .submitButton {
    background-color: #5cb85c;
    border-radius: 0.4em;
    border-color: #5cb85c;
    margin-top: 1em;
    padding: 0.5em 1em 0.5em 1em;
    color: black;
    outline: none;
    align-self: flex-end;

    filter: drop-shadow(5px 5px 10px rgba(5, 5, 5, 0.2));
    :hover {
      border-color: #81e981;
      background: #81e981;
    }
  }

  .surveyName_label {
    font-size: 2em;
  }

  .question_label {
    font-size: 1.2em;
  }
  .options > Label {
    font-size: 0.8em;
  }
  .question_container {
    margin: 2em 0 2em 0;
    width: 100%;
  }
`
