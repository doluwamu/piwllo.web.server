import AppError from "../../error/appError.js";
import Task from "../../models/taskModel.js";

// Request type: POST
// To: /api/v1/tasks
// Desc: to add a new task
const createTask = async (req, res, next) => {
  try {
    const { task, rank } = req.body;
    const user = req.user;

    if (!task) {
      return next(new AppError("task is required!", 400));
    }

    if (!rank) {
      return next(new AppError("rank is required!", 400));
    }

    // const existingTask = await Task.findOne({ task }).populate("owner");

    // if (existingTask && existingTask.owner.id === user.id) {
    //   return next(new AppError("This task already exists", 400));
    // }

    const taskToCreate = new Task({
      owner: user._id,
      task,
      rank,
    });

    await taskToCreate.save();

    return res.status(201).json({ message: "Task added successfully :)" });
  } catch (error) {
    return next(error);
  }
};

export default createTask;
