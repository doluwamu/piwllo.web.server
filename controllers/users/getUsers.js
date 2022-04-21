import User from "../../models/userModel.js";

// Request type: GET
// To: /api/v1/users/
// Desc: to get all users from DB(Admins Only)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

export default getUsers;
