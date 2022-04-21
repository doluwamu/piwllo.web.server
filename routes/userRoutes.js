import express from "express";
import deleteAllUsers from "../controllers/users/deleteAllUsers.js";
import deleteUser from "../controllers/users/deleteUser.js";
import getUsers from "../controllers/users/getUsers.js";
import {
  getUserProfile,
  updateProfile,
} from "../controllers/users/userProfile.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/user/profile", isAuthenticated, getUserProfile);
router.put("/user/profile/edit", isAuthenticated, updateProfile);
router.delete("/user/:userId/delete", isAuthenticated, deleteUser);
router.delete("", isAuthenticated, isAdmin, deleteAllUsers);
router.get("", isAuthenticated, isAdmin, getUsers);

export default router;
