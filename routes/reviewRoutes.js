import express from "express";
import addReview from "../controllers/reviews/addReview.js";
import deleteReview from "../controllers/reviews/deleteReview.js";
import getReviews from "../controllers/reviews/getReviews.js";
import toggleLikeReview from "../controllers/reviews/likeReview.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, addReview);
router.get("/", isAuthenticated, isAdmin, getReviews);
router.put("/:reviewId/like", toggleLikeReview);
router.delete("/:reviewId", isAuthenticated, isAdmin, deleteReview);

export default router;
