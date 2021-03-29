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

`

export const Back = styled.button`
  justify-content: flex-end;
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
`
