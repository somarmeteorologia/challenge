import styled, { css } from 'styled-components'

export const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const HeadCell = styled.th`
  padding-top: 28px;
  padding-bottom: 28px;
  background-color: #eaeaea;
`

export const HeadCellTitle = styled.span`
  display: block;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  margin-bottom: 2px;
`

export const HeadCellSubtitle = styled.span`
  display: block;
  font-weight: 500;
  font-size: 0.8125rem;
  text-transform: uppercase;
  color: rgba(51, 51, 51, 0.5);
`

export const Row = styled.tr`
  border-bottom: 1px solid #d4d4d4;
`

export const BodyCell = styled.td`
  padding-top: 28px;
  padding-bottom: 28px;
  text-align: center;
`

export const BodyCellContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: .875rem;
  font-weight: 700;
  color: #525252;

  ${({ name }) =>
    name !== 'humidity' &&
    css`
      &::before {
        content: '';
        width: 0;
        height: 0;
        margin-right: 10px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
      }
    `}

  ${({ name }) =>
    name === 'min' &&
    css`
      color: #59ebff;

      &::before {
        border-top: 6px solid #59ebff;
      }
    `}

  ${({ name }) =>
    name === 'max' &&
    css`
      color: #e86c60;

      &::before {
        border-bottom: 6px solid #e86c60;
      }
    `}
`

export const Bars = styled.div`
  display: flex;
  margin-right: 6px;

  ${({ active }) => css`
    ${Bar} {
      &:nth-child(${active}) ~ ${Bar} {
        background-color: #c4c4c4;
      }
    }
  `}
`

export const Bar = styled.span`
  width: 3px;
  height: 15px;
  background-color: #3fa2f7;
  border-radius: 2px;

  &:not(:last-child) {
    margin-right: 2px;
  }
`
