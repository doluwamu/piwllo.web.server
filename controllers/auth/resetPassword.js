import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";

// Request type: PUT
// To: /api/v1/auth/password-reset/:email
// Desc: to reset password on forgetting password
const resetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    const { email } = req.params;

    if (!password) {
      return next(new AppError("Password is required!", 400));
    }
    if (!confirmPassword) {
      return next(new AppError("Confirmation password is required!", 400));
    }

    if (password !== confirmPassword) {
      return next(new AppError("Passwords don't match", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("User with this email does not exist", 400));
    }

    user.password = password || user.password;
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    return next(error);
  }
};

export default resetPassword;
