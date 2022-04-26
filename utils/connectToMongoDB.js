import mongoose from "mongoose";
import logger from "./logger.js";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

console.log(MONGO_URL);

const connectToMongoDB = async () => {
  try {
    mongoose.connect(
      MONGO_URL,
      {
        autoIndex: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      },
      () => logger.info("DB Connection Successful!")
    );
  } catch (err) {
    logger.error("DB Connection not successful!", err);
    //process.exit(1);
  }
};

export default connectToMongoDB;
