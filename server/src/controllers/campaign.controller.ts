import type { Request, Response } from "express";
import { getCampaigns as getCampaignsService } from "../services/campaign.service";

export const getCampaigns = async (
  req: Request,
  res: Response
) => {
  const campaigns = await getCampaignsService();

  res.status(200).json({
    success: true,
    data: campaigns,
  });
};