import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_EXPIRES, JWT_SECRET } = process.env;

export const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
};
