import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .create_survey {
    margin: 1em 0.55em 0 0;
    align-self: flex-end;
  }
  .create_survey_button {
    filter: drop-shadow(5px 5px 10px rgba(5, 5, 5, 0.2));
    :hover {
      border-color: #459dfc;
      background: #459dfc;
    }
  }
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
