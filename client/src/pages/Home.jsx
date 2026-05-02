import { useEffect, useState } from "react";
import { habitAPI } from "../services/api.js";
import HabitForm from "../components/HabitForm.jsx";
import HabitList from "../components/HabitList.jsx";
import StatsBar from "../components/StatsBar.jsx";

const Home = () => {
  const [habits, setHabits] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch habits + stats together
  const fetchData = async () => {
    try {
      setLoading(true);
      const [habitsRes, statsRes] = await Promise.all([
        habitAPI.getAll(),
        habitAPI.getStats(),
      ]);
      setHabits(habitsRes.data);
      setStats(statsRes.data);
      setError(null);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshStats = async () => {
    try {
      const { data } = await habitAPI.getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddHabit = async (habitData) => {
    try {
      const { data } = await habitAPI.create(habitData);
      setHabits([data, ...habits]);
      refreshStats();
    } catch (err) {
      console.error("Error adding habit:", err);
      alert("Failed to add habit");
    }
  };

  const handleToggle = async (id) => {
    try {
      const { data } = await habitAPI.toggleComplete(id);
      setHabits(habits.map((h) => (h._id === id ? data : h)));
      refreshStats();
    } catch (err) {
      console.error("Error toggling habit:", err);
      alert("Failed to update habit");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;
    try {
      await habitAPI.delete(id);
      setHabits(habits.filter((h) => h._id !== id));
      refreshStats();
    } catch (err) {
      console.error("Error deleting habit:", err);
      alert("Failed to delete habit");
    }
  };

  if (loading) return <div className="loader">Loading habits...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <StatsBar stats={stats} />
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
