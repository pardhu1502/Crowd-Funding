import express from 'express';
import  cors from 'cors';

import campaignRoutes from "./routes/campaign.routes";
import { errorHandler } from './middleware/error.middleware';
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import donationRoutes from "./routes/donation.routes";
import paymentRoutes from "./routes/payment.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health",(req,res)=>{
res.status(200).json({
  success:true,
  message:"server is running",
});
});

app.use("/api/campaigns", campaignRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/payments", paymentRoutes);
app.use(errorHandler);

export default app;