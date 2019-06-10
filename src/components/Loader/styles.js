import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Icon = styled.span`
  display: block;
  width: 50px;
  height: 50px;
  border: 4px solid rgba(63, 162, 247, 0.5);
  border-top-color: #3fa2f7;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`
