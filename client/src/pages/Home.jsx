import { useEffect, useState } from "react";
import api from "../services/api.js";

const Home = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const { data } = await api.get("/habits");
        setHabits(data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };
    fetchHabits();
  }, []);

  return (
    <div>
      <h2>Your Habits</h2>
      {habits.length === 0 ? (
        <p>No habits yet. Start adding some!</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <li key={habit._id}>{habit.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
