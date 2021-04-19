import { css } from '@emotion/react'
import styled from '@emotion/styled'

const FlexColumn = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const FormWrapper = styled.form`
  ${FlexColumn}
  width: 50%;
  margin: 0.25rem;
`

const Button = styled.button`
  padding: 1rem;
  border: 2px solid rgba(165, 243, 252);
  border-radius: 5px;
  background: #057582;
  transition: all 0.3s ease-in-out;
  color: #fff;
  font-family: 'Lora';
  font-size: 1.125rem;
  &:hover {
    transform: scale(1.1);
  }
`

export { Button, FormWrapper }
