import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.ts";
import { createCampaign } from "../controllers/campaign.controller.ts";

const campaignRouter = Router()

// create new campaign
campaignRouter.post("/createCampaign", verifyJWT, createCampaign);

export default campaignRouter;