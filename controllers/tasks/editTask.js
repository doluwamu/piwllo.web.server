import Task from "../../models/taskModel.js";
import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";

// Request type: PUT
// To: /api/v1/tasks/task/:taskId
// Desc: to update a task
const editTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const user = req.user;

    const task = await Task.findById(taskId);

    const owner = await User.findById(task.owner);

    if (user.id !== owner.id) {
      return next(new AppError("This task is not yours", 401));
    }

    // const existingTask = await Task.findOne({
    //   task: req.body.task,
    // }).populate("owner");

    // if (existingTask && existingTask.owner.id === user.id) {
    //   return next(new AppError("This task already exists!", 400));
    // }

    task.task = req.body.task || task.task;
    task.rank = req.body.rank || task.rank;

    await task.save();

    return res.json({ message: "Task succefully updated :)" });
  } catch (error) {
    return next(error);
  }
};

export default editTask;
