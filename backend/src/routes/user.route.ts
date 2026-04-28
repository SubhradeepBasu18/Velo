import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user.controller.ts";
import { verifyJWT } from "../middleware/auth.middleware.ts";

const router = Router();

router.post("/register", registerUser);

router.post("/login", verifyJWT, loginUser);

router.post("/logout", verifyJWT, logoutUser);

export default router;