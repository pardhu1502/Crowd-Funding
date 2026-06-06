import express from 'express';
import cors from 'cors';
import campaignRoutes from "./routes/campaign.routes";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "server is running",
    });
});
app.use("/api/campaigns", campaignRoutes);
export default app;
//# sourceMappingURL=app.js.map