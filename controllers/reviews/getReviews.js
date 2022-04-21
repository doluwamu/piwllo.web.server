import Review from "../../models/reviewModel.js";
import AppError from "../../error/appError.js";

// Request type: GET
// To: /api/v1/reviews
// Desc: to get all reviews from DB (Admins Only)
const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({}).populate("user");
    return res.json(reviews);
  } catch (error) {
    return next(error);
  }
};

export default getReviews;
