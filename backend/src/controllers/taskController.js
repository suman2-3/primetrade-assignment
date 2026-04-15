const Task = require("../models/Task");

//create
exports.createTask = async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title required" });
    }

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id, // attach logged-in user
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

/* GET */
exports.getTasks = async (req, res) => {
  try {
    let tasks;

    // ADMIN (all tasks + user email)
    if (req.user.role === "admin") {
      tasks = await Task.find().populate("user", "email");
    } 
    // USER (only own tasks)
    else {
      tasks = await Task.find({ user: req.user.id });
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE */
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    
    if (
      task.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;

    await task.save();

    res.json(task);
  } catch (err) {
    next(err);
  }
};

/* DELETE  */
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    
    if (
      task.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};

exports.toggleTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Not found" });

  // allow admin or owner
  if (task.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not allowed" });
  }

  task.completed = !task.completed;
  await task.save();

  res.json(task);
};