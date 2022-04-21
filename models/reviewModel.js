import mongoose from "mongoose";
import { constants } from "../utils/constants.js";

const { USER, REVIEW } = constants;

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    review: {
      type: String,
      required: [true, "Please write a review"],
    },
    liked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Review = model(REVIEW, reviewSchema);

export default Review;
