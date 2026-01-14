import Attendance from "../models/Attendance.js";

// 1️⃣ MARK ATTENDANCE (Employee)
export const markAttendance = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["present", "absent"].includes(status)) {
      return res.status(400).json({ message: "Invalid attendance status" });
    }

    // Normalize date (start of today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.create({
      user: req.user.id,
      date: today,
      status,
    });

    res.status(201).json(attendance);
  } catch (error) {
    // Duplicate attendance (unique index)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for today" });
    }

    res.status(500).json({ message: error.message });
  }
};

// 2️⃣ GET MY ATTENDANCE (Employee)
export const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ GET ALL ATTENDANCE (Admin)
export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("user", "name email role")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
