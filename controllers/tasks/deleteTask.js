import Task from "../../models/taskModel.js";
import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";

// Request type: DELETE
// To: /api/v1/tasks/task/:taskId
// Desc: to delete a task
const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const user = req.user;

    const task = await Task.findById(taskId);

    const owner = await User.findById(task.owner);

    if (user.id !== owner.id && !user.isAdmin) {
      return next(new AppError("This task is not yours", 401));
    }

    const deletedTask = await task.remove();

    if (!deletedTask) {
      return next(new AppError("Could not delete this task", 401));
    }

    const tasks = await Task.find({});

    return res.json({ message: "Task successfully deleted!", tasks });
  } catch (error) {
    return next(error);
  }
};

export default deleteTask;
