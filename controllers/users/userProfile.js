import AppError from "../../error/appError.js";
import User from "../../models/userModel.js";
import validator from "validator";
import { generateToken } from "../../utils/token.js";

// Request type: GET
// To: /api/v1/users/user/profile
// Desc: to get info about the authenticated user
export const getUserProfile = async (req, res, next) => {
  try {
    const user = req.user;

    const profile = await User.findById(user._id)
      .populate("image", "-createdAt -updatedAt")
      .select("-isAdmin -createdAt -updatedAt");

    return res.json(profile);
  } catch (error) {
    return next(error);
  }
};

// Request type: PUT
// To: /api/v1/users/user/profile/edit
// Desc: to update a user's profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, image } = req.body;

    if (password && !confirmPassword) {
      return next(new AppError("Please provide a confirmation password", 400));
    }

    if (password !== confirmPassword) {
      return next(
        new AppError("password and confirmation password don't match", 400)
      );
    }

    const user = await User.findById(req.user._id)
      .select("+password")
      .populate("image", "-createdAt -updatedAt");

    if (!user) {
      return next(new AppError("User doesn't exist", 400));
    }

    if (!validator.isEmail(email)) {
      return next(new AppError("Please provide a valid email", 400));
    }

    const userExists = await User.findOne({ email });

    if (userExists && userExists.id !== user.id) {
      return next(new AppError("User with this email already exists!", 400));
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.image = image || user.image;

    await user.save();

    return res.json({
      _id: user._id,
      image: user.image,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    return next(error);
  }
};
