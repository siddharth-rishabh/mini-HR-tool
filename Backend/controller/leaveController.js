import Leave from "../models/Leave.js";
import User from "../models/User.js";

export const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const totalDays =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const leave = await Leave.create({
      user: req.user.id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const cancelLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (leave.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending leave can be cancelled" });
    }

    await leave.deleteOne();
    res.json({ message: "Leave cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Leave already processed" });
    }

    leave.status = status;
    await leave.save();

    if (status === "approved") {
      const user = await User.findById(leave.user);
      user.leaveBalance -= leave.totalDays;
      await user.save();
    }

    res.json({ message: `Leave ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
