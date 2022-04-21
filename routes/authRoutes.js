import express from "express";
import resetPassword from "../controllers/auth/resetPassword.js";
import signIn from "../controllers/auth/userLogin.js";
import signUp from "../controllers/auth/userRegister.js";
import verifyEmail from "../controllers/auth/verifyEmail.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/verify-email", verifyEmail);
router.put("/password-reset/:email", resetPassword);

export default router;
