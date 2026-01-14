import express from "express";
import {
  markAttendance,
  getMyAttendance,
  getAllAttendance,
} from "../controller/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Employee routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware("employee"),
  markAttendance
);

router.get(
  "/me",
  authMiddleware,
  roleMiddleware("employee"),
  getMyAttendance
);

// Admin route
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllAttendance
);

export default router;
