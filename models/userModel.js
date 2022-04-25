import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { constants } from "../utils/constants.js";

const { USER, CLOUDINARYIMAGE } = constants;

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    image: {
      type: Schema.Types.ObjectId,
      ref: CLOUDINARYIMAGE,
      default: "62336aa1a9c02c01d7e607e0",
    },
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [8, "Password must be at least 8 characters!"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

const User = model(USER, userSchema);

export default User;
