import { Router } from "express";
import { getCampaigns, createCampaign, } from "../controllers/campaign.controller";
const router = Router();
router.get("/", getCampaigns);
router.post("/", createCampaign);
export default router;
//# sourceMappingURL=campaign.routes.js.map