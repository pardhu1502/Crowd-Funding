import { Router } from "express";
import { getCampaigns,
    createCampaign,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
} from "../controllers/campaign.controller";
import { validate } from "../middleware/validate.middleware";
import { createCampaignSchema,updateCampaignSchema, } from "../validators/campaign.validator";
import { authenticate } from "../middleware/auth.middleware";
import { isCampaignOwner } from "../middleware/campaign-owner.middleware";

const router = Router();

router.get("/", getCampaigns);
router.post("/", validate(createCampaignSchema), createCampaign);
router.get("/:id", getCampaignById);
router.patch("/:id", authenticate, isCampaignOwner, validate(updateCampaignSchema), updateCampaign);
router.delete("/:id", authenticate, isCampaignOwner, deleteCampaign);

export default router;