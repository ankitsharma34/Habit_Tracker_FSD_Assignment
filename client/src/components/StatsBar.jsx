const StatsBar = ({ stats }) => {
  if (!stats) return null;

  const items = [
    { label: "Total Habits", value: stats.totalHabits, icon: "📋" },
    {
      label: "Done Today",
      value: `${stats.completedToday}/${stats.totalHabits}`,
      icon: "✅",
    },
    {
      label: "Best Streak",
      value: `${stats.longestStreakOverall} days`,
      icon: "🏆",
    },
    { label: "Total Completions", value: stats.totalCompletions, icon: "⭐" },
  ];

  return (
    <div className="stats-bar">
      {items.map((item, idx) => (
        <div key={idx} className="stat-item">
          <span className="stat-icon">{item.icon}</span>
          <div>
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
