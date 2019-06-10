import React, { useState, useEffect } from 'react'

import { formatDate, truncate } from '../../utils'

import Table from '../../components/Table'
import Chart from '../../components/Chart'
import Loader from '../../components/Loader'

import { Container, Wrapper } from './styles'

export default function Main () {
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState(null)
  const [forecast, setForecast] = useState({
    table: {
      date: [],
      min: [],
      max: [],
      humidity: []
    },
    chart: []
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLocation({ latitude, longitude })
      }
    )
  }, [])

  useEffect(() => {
    if (location) {
      fetchForecast(location)
    }
  }, [location])

  async function fetchForecast (location) {
    try {
      setLoading(true)

      const { latitude, longitude } = location

      const headers = new Headers({
        'x-api-key': process.env.REACT_APP_API_KEY
      })

      const response = await fetch(
        `${
          process.env.REACT_APP_API_URL
        }/forecast/10days?latitude=${latitude}&longitude=${longitude}&reference=Somar`,
        { headers }
      )

      const {
        days,
        points: {
          forecast: {
            temperature_daily_min,
            temperature_daily_max,
            rel_humidity_daily_avg
          }
        }
      } = await response.json()

      const data = {
        date: days.slice(0, 7).map(date => formatDate(date)),
        min: temperature_daily_min.slice(0, 7).map(min => truncate(min)),
        max: temperature_daily_max.slice(0, 7).map(max => truncate(max)),
        humidity: rel_humidity_daily_avg
          .slice(0, 7)
          .map(humidity => truncate(humidity))
      }

      const tableData = { ...data }

      const chartData = []

      data.date.forEach((_, index) => {
        chartData[index] = {
          min: data.min[index],
          max: data.max[index],
          humidity: data.humidity[index]
        }
      })

      setForecast({
        table: { ...tableData },
        chart: [...chartData]
      })

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Wrapper>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Table data={forecast.table} />
            <Chart data={forecast.chart} />
          </>
        )}
      </Wrapper>
    </Container>
  )
}
