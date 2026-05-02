import {
  isCompletedToday,
  formatDate,
  getStreakEmoji,
} from "../utils/dateUtils.js";

const HabitCard = ({ habit, onToggle, onDelete }) => {
  const completed = isCompletedToday(habit.completedDates);
  const currentStreak = habit.currentStreak || 0;
  const longestStreak = habit.longestStreak || 0;

  return (
    <div className={`habit-card ${completed ? "completed" : ""}`}>
      <div className="habit-info">
        <h3>{habit.title}</h3>
        {habit.description && <p>{habit.description}</p>}

        <div className="habit-stats">
          <span className="stat-pill streak">
            {getStreakEmoji(currentStreak)} Current: {currentStreak}{" "}
            {currentStreak === 1 ? "day" : "days"}
          </span>
          <span className="stat-pill best">
            🏆 Best: {longestStreak} {longestStreak === 1 ? "day" : "days"}
          </span>
          <span className="stat-pill last">
            📅 Last: {formatDate(habit.lastCompleted)}
          </span>
        </div>
      </div>

      <div className="habit-actions">
        <button
          className={`toggle-btn ${completed ? "done" : ""}`}
          onClick={() => onToggle(habit._id)}
          title={completed ? "Unmark today" : "Mark complete for today"}
        >
          {completed ? "✅ Done Today" : "⭕ Mark Done"}
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(habit._id)}
          title="Delete habit"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
