import { useState } from "react";

const HabitForm = ({ onAddHabit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await onAddHabit({ title, description });
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding habit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <h2>➕ Add New Habit</h2>
      <input
        type="text"
        placeholder="Habit title (e.g., Drink Water)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="2"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Habit"}
      </button>
    </form>
  );
};

export default HabitForm;
