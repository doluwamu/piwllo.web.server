import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";
import { generateToken } from "../../utils/token.js";

// Request type: POST
// To: /api/v1/auth/signup
// Desc: to register a user
const signUp = async (req, res, next) => {
  try {
    const { image, name, email, password, confirmPassword } = req.body;

    if (!name) {
      return next(new AppError("Username is required!", 400));
    }
    if (!email) {
      return next(new AppError("Email is required!", 400));
    }
    if (!password) {
      return next(new AppError("Cassword is required!", 400));
    }
    if (!confirmPassword) {
      return next(new AppError("Confirmation password is required!", 400));
    }

    if (password !== confirmPassword) {
      return next(new AppError("Passwords don't match", 400));
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return next(new AppError("User with this email already exists", 401));
    }

    const user = new User({
      image,
      name,
      email,
      password,
    });

    await user.save();
    return res.status(201).json({ message: "Registration successful :)" });
  } catch (error) {
    return next(error);
  }
};

export default signUp;
