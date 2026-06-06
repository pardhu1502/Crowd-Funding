import type { Request, Response } from "express";
import { getCampaigns as getCampaignsService, createCampaign as createCampaignService, } from "../services/campaign.service";
import type { CreateCampaignInput } from "../types/campaign.types";

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

export const createCampaign = async (
  req: Request,
  res: Response
) => {
  const data: CreateCampaignInput = req.body;

  const campaign = await createCampaignService(data);

  res.status(201).json({
    success: true,
    data: campaign,
  });
};