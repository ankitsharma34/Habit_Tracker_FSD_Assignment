import Habit from "../models/habitModel.js";

// @desc    Get all habits
// @route   GET /api/habits
export const getHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.status(200).json(habits);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a habit
// @route   POST /api/habits
export const createHabit = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const habit = await Habit.create({ title, description });
    res.status(201).json(habit);
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
    res.status(200).json(habit);
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
