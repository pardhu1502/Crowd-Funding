import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createPaymentOrder,verifyPaymentController } from "../controllers/payment.controller";
import { validate } from "../middleware/validate.middleware";
import { createOrderSchema,verifyPaymentSchema } from "../validators/payment.validator";


const router = Router();

router.post(
  "/create-order",
  authenticate,
  validate(createOrderSchema),
  createPaymentOrder
);

router.post(
  "/verify",
  authenticate,
  validate(verifyPaymentSchema),
  verifyPaymentController
);

export default router;