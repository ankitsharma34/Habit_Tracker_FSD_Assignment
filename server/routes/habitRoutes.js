import express from "express";
import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabitCompletion,
} from "../controllers/habitController.js";

const router = express.Router();

router.route("/").get(getHabits).post(createHabit);
router.route("/:id").put(updateHabit).delete(deleteHabit);
router.patch("/:id/toggle", toggleHabitCompletion);

export default router;
