import Habit from "../models/habitModel.js";
import { calculateStreaks } from "../utils/streakCalculator.js";

// Helper: Check if two dates are the same day
const isSameDay = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Helper: Add streak data to habit object
const addStreakData = (habit) => {
  const habitObj = habit.toObject ? habit.toObject() : habit;
  const streaks = calculateStreaks(habitObj.completedDates);
  return { ...habitObj, ...streaks };
};

// @desc    Get all habits with streak info
// @route   GET /api/habits
export const getHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    const habitsWithStreaks = habits.map(addStreakData);
    res.status(200).json(habitsWithStreaks);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a habit
// @route   POST /api/habits
export const createHabit = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }
    const habit = await Habit.create({
      title: title.trim(),
      description: description?.trim() || "",
    });
    res.status(201).json(addStreakData(habit));
  } catch (error) {
    next(error);
  }
};

// @desc    Update a habit
// @route   PUT /api/habits/:id
export const updateHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json(addStreakData(habit));
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
export const deleteHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle habit completion for today
// @route   PATCH /api/habits/:id/toggle
export const toggleHabitCompletion = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const today = new Date();
    const alreadyCompletedToday = habit.completedDates.some((date) =>
      isSameDay(date, today),
    );

    if (alreadyCompletedToday) {
      habit.completedDates = habit.completedDates.filter(
        (date) => !isSameDay(date, today),
      );
    } else {
      habit.completedDates.push(today);
    }

    await habit.save();
    res.status(200).json(addStreakData(habit));
  } catch (error) {
    next(error);
  }
};

// @desc    Get overall stats (all habits)
// @route   GET /api/habits/stats
export const getStats = async (req, res, next) => {
  try {
    const habits = await Habit.find();
    const habitsWithStreaks = habits.map(addStreakData);

    const totalHabits = habitsWithStreaks.length;
    const completedToday = habitsWithStreaks.filter((h) =>
      h.completedDates.some((d) => isSameDay(d, new Date())),
    ).length;
    const longestStreakOverall = habitsWithStreaks.reduce(
      (max, h) => Math.max(max, h.longestStreak || 0),
      0,
    );
    const totalCompletions = habitsWithStreaks.reduce(
      (sum, h) => sum + (h.completedDates?.length || 0),
      0,
    );

    res.status(200).json({
      totalHabits,
      completedToday,
      longestStreakOverall,
      totalCompletions,
    });
  } catch (error) {
    next(error);
  }
};
