import type { Request, Response, NextFunction } from "express";
import { createOrder } from "../services/payment.service";
import { verifyPayment } from "../services/payment-verification.service";

export const createPaymentOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { campaignId, amount } = req.body;

    const donorId = req.user!.userId;

    const order = await createOrder(campaignId,donorId,amount);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    await verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    next(error);
  }
};