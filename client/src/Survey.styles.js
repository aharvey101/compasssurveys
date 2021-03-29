import styled from 'styled-components'

export const QuestionStyle = styled.div`
  align-self: flex-start;
  width: 70vw;
  max-height: 50em;
  margin: 1em 0 1em 0;
  background-color: #ccf3ff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  h1 {
    padding: 1em 0 0 1em;
    font-size: 20px;
  }

  p {
    padding: 0.25em;
    margin: 0em 1em 1em 1em;
  }

  .answer {
    padding: 0.25em 0 0.5em 0;
  }
  .answer_input {
    margin-left: 1.25em;
    /* padding-left: 1em; */
  }
  .answer_label {
    padding-left: 1em;
  }
`
