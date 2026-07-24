import crypto from "crypto";
import prisma from "../config/prisma";
import { env } from "../config/env";

export const verifyPayment = async (
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) => {
  const generatedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    throw new Error("Invalid payment signature");
  }

  return await prisma.$transaction(async (tx) => {
    const donation = await tx.donation.findUnique({
      where: {
        orderId: razorpay_order_id,
      },
    });

    if (!donation) {
      throw new Error("Donation not found");
    }

    if (donation.paymentStatus === "SUCCESS") {
      return donation;
    }

    await tx.donation.update({
      where: {
        id: donation.id,
      },
      data: {
        paymentStatus: "SUCCESS",
        paymentId: razorpay_payment_id,
      },
    });

    await tx.campaign.update({
      where: {
        id: donation.campaignId,
      },
      data: {
        currentAmount: {
          increment: donation.amount,
        },
      },
    });

    return donation;
  });
};