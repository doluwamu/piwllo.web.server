import User from "../../models/userModel.js";

// Request type: GET
// To: /api/v1/users/
// Desc: to get all users from DB(Admins Only)
const getUsers = async (req, res, next) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.pageNumber) || 1;

    const count = await User.countDocuments({});
    const users = await User.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    return res.json({ users, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    return next(error);
  }
};

export default getUsers;
