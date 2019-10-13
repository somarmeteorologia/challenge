import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Graphic({ data }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey={"day"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="temp_max" stroke="#FF3232" />
          <Line dataKey="temp_min" stroke="#00CCCC" />
          <Bar
            dataKey="humidity"
            barSize={17}
            fill="#3FA2F7"
            label={{ position: "top" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
