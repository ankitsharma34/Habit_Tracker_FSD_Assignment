import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const HabitPieChart = ({ data }) => {
  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b", "#10b981", "#06b6d4"];

  // Filter out habits with 0 completions for better visualization
  const filteredData = data.filter((item) => item.value > 0);

  if (filteredData.length === 0) {
    return (
      <div className="chart-container">
        <h3 className="chart-title">Total Completions</h3>
        <div className="no-data-chart">No completions yet</div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Total Completions</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HabitPieChart;
