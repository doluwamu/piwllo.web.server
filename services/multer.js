import multer from "multer";

const ALLOWED_FORMAT = ["image/jpeg", "image/png", "image/jpg"];

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Not supported file format"), false);
    }
  },
});

export default upload;
