import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/profile",authenticate,getCurrentUser);

export default router;