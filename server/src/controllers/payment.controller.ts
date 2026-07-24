import type { Request, Response, NextFunction } from "express";
import { createOrder } from "../services/payment.service";

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