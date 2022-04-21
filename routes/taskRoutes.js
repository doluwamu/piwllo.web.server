import { Router } from "express";
import createTask from "../controllers/tasks/createTask.js";
import editTask from "../controllers/tasks/editTask.js";
import deleteTask from "../controllers/tasks/deleteTask.js";
import getAllTasks from "../controllers/tasks/getAllTasks.js";
import {
  getAllUserTasks,
  getTaskById,
  getTaskByPriority,
} from "../controllers/tasks/getUserTasks.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = Router();

router.post("", isAuthenticated, createTask);
router.get("", isAuthenticated, isAdmin, getAllTasks);
router.get("/auser", isAuthenticated, getAllUserTasks);
router.get("/task/:taskId", isAuthenticated, getTaskById);
router.get("/:priority", isAuthenticated, getTaskByPriority);
router.put("/task/:taskId", isAuthenticated, editTask);
router.delete("/task/:taskId", isAuthenticated, deleteTask);

export default router;
