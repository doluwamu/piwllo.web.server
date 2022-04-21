import Review from "../../models/reviewModel.js";
import AppError from "../../error/appError.js";

// Request type: GET
// To: /api/v1/reviews
// Desc: to get all reviews from DB (Admins Only)
const getReviews = async (req, res, next) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Review.countDocuments({});
    const reviews = await Review.find({})
      .populate("user")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    return res.json({ reviews, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    return next(error);
  }
};

export default getReviews;
