import express from "express";
import createTeam from "../controllers/teams/createTeam.js";
import deleteTeams from "../controllers/teams/deleteTeams.js";
import getTeamMembers from "../controllers/teams/getTeamMembers.js";
import getUserTeams from "../controllers/teams/getUserTeams.js";
import getTeams from "../controllers/teams/getTeams.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:teamId/members", isAuthenticated, getTeamMembers);
router.get("", isAuthenticated, getUserTeams);
router.post("/create", isAuthenticated, createTeam);
router.delete("/delete", isAuthenticated, isAdmin, deleteTeams);
router.get("/all", isAuthenticated, isAdmin, getTeams);

export default router;
