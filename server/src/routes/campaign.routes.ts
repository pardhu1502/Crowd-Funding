import { Router } from "express";
import { getCampaigns,
    createCampaign,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
} from "../controllers/campaign.controller";
import { validate } from "../middleware/validate.middleware";
import { createCampaignSchema } from "../validators/campaign.validator";

const router = Router();

router.get("/", getCampaigns);
router.post("/", validate(createCampaignSchema), createCampaign);
router.get("/:id", getCampaignById);
router.patch("/:id", updateCampaign);
router.delete("/:id", deleteCampaign);

export default router;