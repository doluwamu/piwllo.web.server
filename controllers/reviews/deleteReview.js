import Review from "../../models/reviewModel.js";
import AppError from "../../error/appError.js";

// Request type: DELETE
// To: /api/v1/reviews/:reviewId
// Desc: to delete a review(Admins Only)
const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return next(
        new AppError(`Review with id of ${reviewId} does not exist`, 400)
      );
    }

    await review.remove();


    return res.json({ message: "Review successfully deleted :)" });
  } catch (error) {
    return next(error);
  }
};

export default deleteReview;
