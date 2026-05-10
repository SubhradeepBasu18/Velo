import { Router } from "express";
import { sendWelcomeEmail } from "../controllers/email.controller.ts";

const emailRouter = Router();

emailRouter.post("/", sendWelcomeEmail);

export default emailRouter;
