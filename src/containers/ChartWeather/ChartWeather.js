import React from 'react';
import { Line, XAxis, YAxis, ComposedChart, Bar } from 'recharts';

const toDegreesCelsius = (degrees) => {
    return `${degrees.toFixed(0)}°C`
}

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return <text x={x + width / 2} y={y} fill="#000" textAnchor="middle" dy={-6}>{`${Math.trunc(value*10)}%`}</text>;
  };

const ChartWeather = ({
    dataChart = []
}) => {
    return (
            
            <ComposedChart width={1200} height={400} data={dataChart}>
                <XAxis tick={null} padding={{ left: 30, right: 30 }} />
                <YAxis tickFormatter={toDegreesCelsius} />
                <Bar dataKey="avgHumidity" barSize={40} fill="#3fa2f7" label={renderCustomBarLabel} />
                <Line type="monotone" dataKey="maxTempereature" stroke="#e86c60" dot={{ r : 4, strokeWidth: 3 }} />
                <Line type="monotone" dataKey="minTemperature" stroke="#59ebff" dot={{ r : 4, strokeWidth: 3 }} />
            </ComposedChart>
    )
}

export default ChartWeather