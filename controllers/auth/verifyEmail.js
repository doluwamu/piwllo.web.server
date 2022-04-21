import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";
import validator from "validator";

// Request type: POST
// To: /api/v1/auth/verify-email
// Desc: to verify that email exists before resetting password
const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !validator.isEmail(email)) {
      return next(new AppError("Please provide a valid email", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("User with this email does not exist", 400));
    }

    return res.json({ message: "Email verified" });
  } catch (error) {
    return next(error);
  }
};

export default verifyEmail;
