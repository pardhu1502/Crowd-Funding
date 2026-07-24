import razorpay from "../config/razorpay";
import prisma from "../config/prisma";

export const createOrder = async (
  campaignId: string,
  donorId: string,
  amount: number) => {

const donation = await prisma.donation.create({
    data: {
    amount,
    donorId,
    campaignId,
    paymentStatus: "PENDING",
  },
});

  const options = {
    amount: amount * 100, // Razorpay expects paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  await prisma.donation.update({
  where: {
    id: donation.id,
  },
  data: {
    orderId: order.id,
  },
});

  return order;
};