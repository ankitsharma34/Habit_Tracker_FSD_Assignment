import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const WeeklyChart = ({ data }) => {
  const colors = ["#818cf8", "#a78bfa", "#c084fc", "#e879f9", "#fb7185", "#38bdf8", "#2dd4bf"];

  return (
    <div className="chart-container">
      <h3 className="chart-title">Weekly Completions</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.02)" }}
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Bar dataKey="completions" radius={[4, 4, 0, 0]} barSize={30}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyChart;
