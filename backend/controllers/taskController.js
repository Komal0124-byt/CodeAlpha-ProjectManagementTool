import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { title, description, project, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
    });

    res.status(201).json(task);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Task Status
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json(task);

  } catch (error) {
  res.status(500).json({
    message: error.message,
  });
}
};