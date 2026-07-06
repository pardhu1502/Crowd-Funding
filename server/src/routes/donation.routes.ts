import { Router } from "express";
import { donate, getDonations } from "../controllers/donation.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createDonationSchema } from "../validators/donation.validator";

const router = Router();

router.post("/", authenticate,validate(createDonationSchema),donate);
router.get("/campaign/:id",getDonations);
export default router;