import Task from "../../models/taskModel.js";

// Request type: GET
// To: /api/v1/tasks
// Desc: to get all tasks from DB(Admins Only)
const getAllTasks = async (req, res, next) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Task.countDocuments({});
    const tasks = await Task.find({})
      .populate("owner")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return res.json({ tasks, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    return next(error);
  }
};

export default getAllTasks;
