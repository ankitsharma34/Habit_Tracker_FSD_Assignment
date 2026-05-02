import express from "express";
import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabitCompletion,
  toggleDateCompletion,
  getStats,
  getAnalytics,
} from "../controllers/habitController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All habit routes require authentication
router.use(protect);

router.get("/stats", getStats); // Must be before /:id routes
router.get("/analytics", getAnalytics);
router.route("/").get(getHabits).post(createHabit);
router.route("/:id").put(updateHabit).delete(deleteHabit);
router.patch("/:id/toggle", toggleHabitCompletion);
router.patch("/:id/toggle-date", toggleDateCompletion);

export default router;
