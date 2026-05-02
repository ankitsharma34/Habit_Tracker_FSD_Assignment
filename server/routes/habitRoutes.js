import express from "express";
import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabitCompletion,
  getStats,
} from "../controllers/habitController.js";

const router = express.Router();

router.get("/stats", getStats); // Must be before /:id routes
router.route("/").get(getHabits).post(createHabit);
router.route("/:id").put(updateHabit).delete(deleteHabit);
router.patch("/:id/toggle", toggleHabitCompletion);

export default router;
