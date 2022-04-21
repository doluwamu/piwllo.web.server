import Task from "../../models/taskModel.js";

// Request type: GET
// To: /api/v1/tasks
// Desc: to get all tasks from DB(Admins Only)
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({}).populate("owner");

    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
};

export default getAllTasks;
