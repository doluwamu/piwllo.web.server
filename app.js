import express from "express";
import path from "path";
import cors from "cors";
import errorHandler from "./error/errorHandler.js";
import AppError from "./error/appError.js";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

//getting all routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
const { NODE_ENV } = process.env;

//setting up app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const __dirname = path.resolve();

if (NODE_ENV === "development") {
  app.use(morgan("dev"));

  app.get("/", (req, res) => {
    return res.status(200).json({
      message: "Hello there",
    });
  });
}

//setting up all routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// Production initial route
if (NODE_ENV === "production") {
  app.get("/", (req, res) => {
    app.use(express.static(path.join(__dirname, "/public")));
    return res.sendFile(`${__dirname}/public/index.html`);
  });
}

//for invalid route
app.use((req, res, next) => {
  return next(
    new AppError("Specified route does not exist on this server", 404)
  );
});

//error handler
app.use(errorHandler);

export default app;
