import React from 'react'
import PropTypes from 'prop-types'

import { formatForecast } from '../../utils'

import {
  Container,
  HeadCell,
  HeadCellTitle,
  HeadCellSubtitle,
  Row,
  BodyCell,
  BodyCellContent,
  Bars,
  Bar
} from './styles'

export default function Table ({ data: { date, min, max, humidity } }) {
  function isActive (value) {
    if (value <= 20) {
      return 1
    }

    if (value <= 40) {
      return 2
    }

    if (value <= 60) {
      return 3
    }

    if (value <= 80) {
      return 4
    }

    if (value <= 100) {
      return 5
    }
  }

  return (
    <Container>
      <thead>
        <tr>
          {date.map(item => (
            <HeadCell key={item}>
              <HeadCellTitle>
                {item
                  .split(' ')
                  .slice(0, 1)
                  .join('')}
              </HeadCellTitle>
              <HeadCellSubtitle>
                {item
                  .split(' ')
                  .slice(1, 3)
                  .join(' ')}
              </HeadCellSubtitle>
            </HeadCell>
          ))}
        </tr>
      </thead>

      <tbody>
        <Row>
          {max.map((item, index) => (
            <BodyCell key={`${item}-${index}`}>
              <BodyCellContent name='max'>
                {formatForecast(item, 'ºC')}
              </BodyCellContent>
            </BodyCell>
          ))}
        </Row>

        <Row>
          {min.map((item, index) => (
            <BodyCell key={`${item}-${index}`}>
              <BodyCellContent name='min'>
                {formatForecast(item, 'ºC')}
              </BodyCellContent>
            </BodyCell>
          ))}
        </Row>

        <Row>
          {humidity.map((item, index) => (
            <BodyCell key={`${item}-${index}`}>
              <BodyCellContent name='humidity'>
                <Bars active={isActive(item)}>
                  <Bar />
                  <Bar />
                  <Bar />
                  <Bar />
                  <Bar />
                </Bars>
                {formatForecast(item, '%')}
              </BodyCellContent>
            </BodyCell>
          ))}
        </Row>
      </tbody>
    </Container>
  )
}

Table.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.arrayOf(PropTypes.string),
    min: PropTypes.arrayOf(PropTypes.number),
    max: PropTypes.arrayOf(PropTypes.number),
    humidity: PropTypes.arrayOf(PropTypes.number)
  }).isRequired
}
