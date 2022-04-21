import AppError from "../../error/appError.js";
import Task from "../../models/taskModel.js";

// Request type: GET
// To: /api/v1/tasks/auser
// Desc: to get all tasks for an authorized user
export const getAllUserTasks = async (req, res, next) => {
  try {
    const user = req.user;
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          task: {
            $regex: req.query.keyword,
            $options: "i",
          },
          owner: user.id,
        }
      : { owner: user.id };

    const count = await Task.countDocuments({ ...keyword });
    const tasks = await Task.find({ ...keyword })
      .select("-owner")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return res.json({ tasks, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    return next(error);
  }
};

// Request type: GET
// To: /api/v1/tasks/task/:taskId
// Desc: to get all tasks by provided id
export const getTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const user = req.user;

    const task = await Task.findById(taskId).populate("owner");

    if (!task) {
      return next(new AppError("Task not found!", 401));
    }

    if (task.owner.id !== user.id) {
      return next(new AppError("You aren't the owner of this task!", 400));
    }

    return res.json(task);
  } catch (error) {
    return next(error);
  }
};

// Request type: GET
// To: /api/v1/tasks/:priority
// Desc: to get all tasks by their priority ranking
export const getTaskByPriority = async (req, res, next) => {
  try {
    const { priority } = req.params;
    const user = req.user;

    const tasks = await Task.find({
      owner: user.id,
      rank: priority.toLowerCase(),
    });

    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
};
