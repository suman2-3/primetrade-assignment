const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTask
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// apply auth middleware
router.use(protect);

// routes
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);

router.delete("/:id", role("admin"), deleteTask);

router.get("/all", role("admin"), async (req, res) => {
  const Task = require("../models/Task");
  const tasks = await Task.find().populate("user", "email");
  res.json(tasks);
});

router.patch("/:id/toggle", toggleTask);

module.exports = router;