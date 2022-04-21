import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

const cloudinaryV2 = cloudinary.v2;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export const cloudUpload = (file) => cloudinaryV2.uploader.upload(file);
