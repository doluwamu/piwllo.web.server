import app from "./app.js";
import connectToMongoDB from "./utils/connectToMongoDB.js";
import logger from "./utils/logger.js";
import dotenv from "dotenv";

dotenv.config();

const { PORT, NODE_ENV } = process.env;

const startServer = async () => {
  await connectToMongoDB();
  app.listen(PORT, () => {
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${PORT} 🛡️
      ################################################
      SERVER IN ${NODE_ENV} MODE
    `);
  });
};

startServer();

export default app;
