import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.ts";
import { createCampaign } from "../controllers/campaign.controller.ts";
import { upload } from "../middleware/multer.middleware.ts";

const campaignRouter = Router()

// create new campaign
campaignRouter.post("/", verifyJWT, upload.single("csvFile"), createCampaign);

export default campaignRouter;