import React from 'react'
import PropTypes from 'prop-types'
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  LabelList
} from 'recharts'

import { Container } from './styles'
import { formatForecast } from '../../utils'

export default function Chart ({ data }) {
  return (
    <Container>
      <ResponsiveContainer width={'100%'} height={330}>
        <ComposedChart data={data}>
          <XAxis
            stroke='#c4c4c4'
            strokeWidth={0.4}
            tickLine={false}
            tick={false}
          />

          <YAxis yAxisId='humidity' dataKey='humidity' hide />

          <YAxis
            padding={{ top: 25, bottom: 25, left: 100 }}
            yAxisId='temperature'
            tickFormatter={value => `${formatForecast(value, 'ºC')}`}
            stroke='#c4c4c4'
            strokeWidth={0.4}
            tick={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 11,
              stroke: '#666'
            }}
            tickLine={false}
          />

          <Bar
            dataKey='humidity'
            barSize={40}
            fill='#3FA2F7'
            radius={[6, 6, 0, 0]}
            yAxisId='humidity'
          >
            <LabelList
              dataKey='humidity'
              position='insideBottom'
              fill='#fff'
              fontFamily='Roboto, sans-serif'
              fontSize={9}
              formatter={value => `${formatForecast(value, '%')}`}
            />
          </Bar>

          <Line
            yAxisId='temperature'
            type='linear'
            dataKey='max'
            stroke='#E86C60'
            strokeWidth={3}
            dot={{ r: 6 }}
          />

          <Line
            yAxisId='temperature'
            type='linear'
            dataKey='min'
            stroke='#59EBFF'
            strokeWidth={3}
            dot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Container>
  )
}

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      humidity: PropTypes.number
    })
  ).isRequired
}
