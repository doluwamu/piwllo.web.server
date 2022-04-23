import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { bufferToBase64 } from "../services/dataUri.js";
import { cloudUpload } from "../services/cloudinary.js";
import CloudinaryImage from "../models/cloudinaryImageModel.js";
import upload from "../services/multer.js";
import AppError from "../error/appError.js";
import { v2 } from "cloudinary";

const router = express.Router();
const singleUpload = upload.single("image");
const cloudinaryV2 = v2;

const singleUploadCtrl = (req, res, next) => {
  singleUpload(req, res, (error) => {
    if (error) {
      return next(new AppError(error.message, 500));
    }
    next();
  });
};

// Request type: POST
// To: /api/v1/upload
// Desc: to upload a file to cloudinary and store the url and id in the DB
router.post("", isAuthenticated, singleUploadCtrl, async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("Image is not presented!");
    }

    const file64 = bufferToBase64(req.file);
    const result = await cloudUpload(file64.content);
    console.log(result);
    // const uploadedFileEdit = cloudinaryV2.url(result.secure_url, {
    //   width: 400,
    //   height: 400,
    //   crop: "thumb",
    //   gravity: "face",
    // });
    const cImage = new CloudinaryImage({
      url: result.secure_url,
      cloudinaryId: result.public_id,
    });

    const savedImage = await cImage.save();
    return res.json({
      _id: savedImage.id,
      url: savedImage.url,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});

export default router;
