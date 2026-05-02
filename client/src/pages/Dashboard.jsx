import React, { useState, useEffect } from "react";
import { habitAPI } from "../services/api";
import WeeklyChart from "../components/charts/WeeklyChart";
import MonthlyChart from "../components/charts/MonthlyChart";
import HabitPieChart from "../components/charts/HabitPieChart";
import StreakChart from "../components/charts/StreakChart";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await habitAPI.getAnalytics();
      setAnalytics(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError("Failed to load dashboard data. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Analyzing your progress...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!analytics || analytics.streakData.length === 0) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1>📊 Progress Dashboard</h1>
        </div>
        <div className="empty-state-card">
          <h2>No Habits Yet</h2>
          <p>Start tracking your habits to see your progress visualizations here!</p>
          <div style={{ marginTop: '1.5rem' }}>
            <button 
              className="auth-btn" 
              style={{ maxWidth: '200px' }}
              onClick={() => window.location.href = '/'}
            >
              Add Your First Habit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>📊 Progress Dashboard</h1>
        <p>Visualize your consistency and celebrate your wins!</p>
      </div>

      <div className="charts-grid">
        <div className="chart-card full-width">
          <WeeklyChart data={analytics.weeklyData} />
        </div>
        
        <div className="chart-card full-width">
          <MonthlyChart data={analytics.monthlyData} />
        </div>

        <div className="chart-card">
          <HabitPieChart data={analytics.habitBreakdown} />
        </div>

        <div className="chart-card">
          <StreakChart data={analytics.streakData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
