//backend/controllers/taskController.js

const Task = require("../models/Task");

// @desc Create new task
// @route POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Title is required");
    }

    const task = await Task.create({ title, description, status });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc Get all tasks
// @route GET /api/tasks
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc Get single task
// @route GET /api/tasks/:id
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// @desc Update task
// @route PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.status = req.body.status ?? task.status;

    const updated = await task.save();

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc Delete task
// @route DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    await task.deleteOne();

    res.json({ message: "Task removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};