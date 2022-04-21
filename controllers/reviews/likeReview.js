import Review from "../../models/reviewModel.js";
import AppError from "../../error/appError.js";

// Request type: PUT
// To: /api/v1/reviews/:reviewId/like
// Desc: to like a review(Admins Only)
const toggleLikeReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return next(
        new AppError(`Review with id of ${reviewId} does not exist`, 400)
      );
    }

    review.liked = !review.liked ? true : false;
    await review.save();

    return res.json({ liked: review.liked, reviewId: review.id });
  } catch (error) {
    return next(error);
  }
};

export default toggleLikeReview;
