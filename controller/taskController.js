const Task = require("../model/Task");

exports.createTask = async (req, res) => {
  try {
    

    const task = await Task.findOne({ name: req.body.name });
    if (task) {
      return res.status(400).json({ message: "Task already exists" });
    }   
    await Task.create({ ...req.body, created_by: req.body.userId });
    
    return res.status(200).json({
      message: "Task created"
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ isActive: true })
       .populate("created_by", "firstname email")
       .populate("updated_by", "firstname email")
    
    if (tasks.length < 1) {
      return res.status(400).json({ message: "No Task found" });
    }

    return res.status(200).json({
      tasksData: tasks,
      message: "Tasks fetched Successfully"
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports. getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(400).json({ message: "Task Not found" });
    }
    return res.status(200).json({
      task: task,
      message: "Task fetched Successfully"
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskUpdated = await Task.findByIdAndUpdate(id, {
      ...req.body,
      updated_by: req.body.userID
    });
    if (!taskUpdated) {
      return res
        .status(400)
        .json({ message: "Error updating task/Invalid Id" });
    }
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDeleted = await Task.findByIdAndDelete(id);
    if (!taskDeleted) {
      return res
        .status(400)
        .json({ message: "Error deleting task/Invalid Id" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};




