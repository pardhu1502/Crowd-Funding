import express from 'express';
import  cors from 'cors';

import campaignRoutes from "./routes/campaign.routes";
import { errorHandler } from './middleware/error.middleware';
import authRoutes from "./routes/auth.routes";

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
app.use(errorHandler);

export default app;