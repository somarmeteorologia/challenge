import React from 'react';
import { Table } from './style'
import HeaderDays from '../../components/HeaderDays/HeaderDays'
import TemperatureLine from '../../components/Rows/TemperatureLine'
import AvgHumidityLine from '../../components/Rows/AvgHumidityLine'
import {MAX_TEMPERATURE, MIN_TEMPERATURE}  from '../../components/Rows/types'

const TableWeather = ({
    days = [],
    maxTempereature = [],
    minTemperature = [],
    avgHumidity = []
}) => {
    return (
        <Table data-testid='weather-table'>
            <HeaderDays days={days}></HeaderDays>
            <TemperatureLine temperatures={maxTempereature} type={MAX_TEMPERATURE}/>
            <TemperatureLine temperatures={minTemperature} type={MIN_TEMPERATURE}/>
            <AvgHumidityLine avgHumidity={avgHumidity} />
        </Table>
    )
}

export default TableWeather