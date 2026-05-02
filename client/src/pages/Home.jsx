import { useEffect, useState } from "react";
import { habitAPI } from "../services/api.js";
import HabitForm from "../components/HabitForm.jsx";
import HabitList from "../components/HabitList.jsx";

const Home = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all habits
  const fetchHabits = async () => {
    try {
      setLoading(true);
      const { data } = await habitAPI.getAll();
      setHabits(data);
      setError(null);
    } catch (err) {
      setError("Failed to load habits. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // Add new habit
  const handleAddHabit = async (habitData) => {
    try {
      const { data } = await habitAPI.create(habitData);
      setHabits([data, ...habits]);
    } catch (err) {
      console.error("Error adding habit:", err);
      alert("Failed to add habit");
    }
  };

  // Toggle completion
  const handleToggle = async (id) => {
    try {
      const { data } = await habitAPI.toggleComplete(id);
      setHabits(habits.map((h) => (h._id === id ? data : h)));
    } catch (err) {
      console.error("Error toggling habit:", err);
      alert("Failed to update habit");
    }
  };

  // Delete habit
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;
    try {
      await habitAPI.delete(id);
      setHabits(habits.filter((h) => h._id !== id));
    } catch (err) {
      console.error("Error deleting habit:", err);
      alert("Failed to delete habit");
    }
  };

  if (loading) return <div className="loader">Loading habits...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <HabitForm onAddHabit={handleAddHabit} />
      <HabitList
        habits={habits}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
