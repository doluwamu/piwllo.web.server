import User from "../../models/userModel.js";
import Task from "../../models/taskModel.js";
import Review from "../../models/reviewModel.js";
import AppError from "../../error/appError.js";

// Request type: DELETE
// To: /api/v1/users/user/:userId/delete
// Desc: endpoint to delete a user(Admins Only)
const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const tasks = await Task.find({ owner: userId });
    const reviews = await Review.find({ user: userId });

    if (!user) {
      return next(new AppError("User does not exist", 400));
    }
    tasks.map(async (task) => await task.remove());
    reviews.map(async (review) => await review.remove());
    await user.remove();

    return res.json({ message: "User successfully deleted!" });
  } catch (error) {
    return next(error);
  }
};

export default deleteUser;
