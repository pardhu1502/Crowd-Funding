import type { Request, Response, NextFunction } from "express";
import { createOrder } from "../services/payment.service";

export const createPaymentOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount } = req.body;

    const order = await createOrder(amount);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};