import express from "express";
import {
  getAllUsers,
  getAllLeaves,
} from "../controller/adminController.js";
import { updateLeaveStatus } from "../controller/leaveController.js";
import { getAllAttendance } from "../controller/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

router.get(
  "/leaves",
  authMiddleware,
  roleMiddleware("admin"),
  getAllLeaves
);

router.patch(
  "/leaves/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateLeaveStatus
);

router.get(
  "/attendance",
  authMiddleware,
  roleMiddleware("admin"),
  getAllAttendance
);

export default router;
