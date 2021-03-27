import styled, { createGlobalStyle } from 'styled-components'
import BGImage from './images/pencils.jpg'
export const GlobalStyle = createGlobalStyle`
html {
  height: 100%
}

body {
  background-image: url(${BGImage});
  background-size:cover;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  z-index: -1
}

* {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.backButton {
  background-color: #f2c94c;
  border-radius: 0.4em;
  border-color: #f2c94c;
  margin-top: 1em;
  padding: 0.5em 1em 0.5em 1em;
  color: black;
  outline: none;
  align-self: flex-end;
  filter: drop-shadow(5px 5px 10px rgba(5, 5, 5, 0.2));
  :hover {
    background: #f6de94;
  }
  }

`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SurveyButtonStyle = styled.div`
  p {
    margin: 0;
    padding: 0;
    font-size: 1.5em;
  }

  button {
    min-width: 80vw;
    height: 4em;
    margin: 0.5em;
    background: #f2c94c;
    border-radius: 0.8em;
    border-color: #f2c94c;
    outline: none;
    filter: drop-shadow(5px 5px 10px rgba(5, 5, 5, 0.2));
    :hover {
      background: #f6de94;
    }
  }
`

export const QuestionStyle = styled.div`
  align-self: flex-start;
  width: 70vw;
  height: 100%;
  margin: 1em 0 1em 0;
  background-color: #ccf3ff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  h1 {
    margin: 1em;
    font-size: 20px;
  }

  p {
    margin: 1em 1em 1em 1.5em;
  }

  .answer {
    margin: 1em 1em 1em 1em;
  }
`
