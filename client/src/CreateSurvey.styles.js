import styled from 'styled-components'

export const FormWrapper = styled.form`
  margin: 0 auto;
  min-width: 50%;

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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`

export const Submit = styled.button`
  color: red;
`
