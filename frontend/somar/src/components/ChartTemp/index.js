import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function Example({ data }) {
  return (
    <div>
      <ComposedChart width={730} height={250} data={data}>
        <YAxis dataKey="max" />
        <YAxis dataKey="min" />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" fill="#8884d8" stroke="#8884d8" />
        <Bar
          dataKey="humidity"
          data={data.humidity}
          barSize={20}
          fill="#413ea0"
        />
        <Line type="monotone" dataKey="humidity" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
}
