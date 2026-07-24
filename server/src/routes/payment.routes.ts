import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createPaymentOrder } from "../controllers/payment.controller";
import { validate } from "../middleware/validate.middleware";
import { createOrderSchema } from "../validators/payment.validator";

const router = Router();

router.post(
  "/create-order",
  authenticate,
  validate(createOrderSchema),
  createPaymentOrder
);

export default router;