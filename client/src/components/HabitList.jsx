import HabitCard from "./HabitCard.jsx";

const HabitList = ({ habits, onToggle, onDelete }) => {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <p>🌱 No habits yet. Start by adding your first habit above!</p>
      </div>
    );
  }

  return (
    <div className="habit-list">
      <h2>📋 Your Habits ({habits.length})</h2>
      {habits.map((habit) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default HabitList;
