import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createPaymentOrder } from "../controllers/payment.controller";

const router = Router();

router.post(
  "/create-order",
  authenticate,
  createPaymentOrder
);

export default router;