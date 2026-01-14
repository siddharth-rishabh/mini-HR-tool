import express from "express";
import {
  applyLeave,
  getMyLeaves,
  cancelLeave,
  updateLeaveStatus,
} from "../controller/leaveController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("employee"), applyLeave);
router.get("/me", authMiddleware, roleMiddleware("employee"), getMyLeaves);
router.delete("/:id", authMiddleware, roleMiddleware("employee"), cancelLeave);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateLeaveStatus
);

export default router;
