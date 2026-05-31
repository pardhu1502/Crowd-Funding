import { Request, Response } from "express";
import { getCampaigns as getCampaignsService } from "../services/campaign.service";

export const getCampaigns = (
  req: Request,
  res: Response
) => {
  const campaigns = getCampaignsService();

  res.status(200).json({
    success: true,
    data: campaigns,
  });
};