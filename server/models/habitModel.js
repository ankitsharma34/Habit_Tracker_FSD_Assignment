import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
