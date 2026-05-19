import { Router } from "express";
import { sendWelcomeEmail, listDLQJobs } from "../controllers/email.controller.ts";

const emailRouter = Router();

emailRouter.post("/", sendWelcomeEmail);
emailRouter.get("/dlq", listDLQJobs);

export default emailRouter;
