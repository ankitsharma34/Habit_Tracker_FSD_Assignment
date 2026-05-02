import { isCompletedToday } from "../utils/dateUtils.js";

const HabitCard = ({ habit, onToggle, onDelete }) => {
  const completed = isCompletedToday(habit.completedDates);

  return (
    <div className={`habit-card ${completed ? "completed" : ""}`}>
      <div className="habit-info">
        <h3>{habit.title}</h3>
        {habit.description && <p>{habit.description}</p>}
        <small>Total completions: {habit.completedDates?.length || 0}</small>
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
