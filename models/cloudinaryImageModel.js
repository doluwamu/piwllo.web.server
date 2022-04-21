import mongoose from "mongoose";

import { constants } from "../utils/constants.js";

const { CLOUDINARYIMAGE } = constants;

const { Schema, model } = mongoose;

const imageSchema = new Schema(
  {
    url: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CloudinaryImage = model(CLOUDINARYIMAGE, imageSchema);

export default CloudinaryImage;
