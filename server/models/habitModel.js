import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Habit title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    completedDates: {
      type: [Date],
      default: [],
    },
  },
  { timestamps: true },
);

const Habit = mongoose.model("Habit", habitSchema);
export default Habit;
