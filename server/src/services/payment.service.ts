import razorpay from "../config/razorpay";

export const createOrder = async (amount: number) => {
  const options = {
    amount: amount * 100, // Razorpay expects paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  return order;
};