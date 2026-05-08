import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.ts";
import { createNewMessage } from "../controllers/message.controller.ts";

const messageRouter = Router()

// add message
messageRouter.post("/addMessage", verifyJWT, createNewMessage);

export default messageRouter;