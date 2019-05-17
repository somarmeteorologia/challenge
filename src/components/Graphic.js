import React from 'react';
import { 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer, 
  ComposedChart, 
  Bar
} from 'recharts';

import {
   } from 'recharts';

const data = [
  {
    name: 'Domingo', tmax: 40, tmin: 24, hum: 40,
  },
  {
    name: 'Segunda', tmax: 30, tmin: 18, hum: 22,
  },
  {
    name: 'Terça', tmax: 20, tmin: 80, hum: 90,
  },
  {
    name: 'Quarta', tmax: 28, tmin: 38, hum: 20,
  },
  {
    name: 'Quinta', tmax: 19, tmin: 40, hum: 81,
  },
  {
    name: 'Sexta', tmax: 23, tmin: 30, hum: 25,
  },
  {
    name: 'Sabado', tmax: 34, tmin: 43, hum: 21,
  },
];

export default class Graphic extends React.Component {

  render(props) {

    const { data } = this.props;

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            align={'center'}
            iconSize={50}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="hum" />
              %
            <YAxis />
            <Tooltip/>
            <Legend verticalAlign="bottom" height={20}/>
            <Line name="Temperatura Minima" type="monotone" dataKey="tmin" stroke="#59EBFF" activeDot={{ r: 8 }} />
            <Bar name="Umidade" dataKey="hum" barSize={50} fill="#3FA2F7" />
            <Line name="Temperatura Maxima" type="monotone" dataKey="tmax" stroke="#E86C60" activeDot={{ r: 8 }}/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
