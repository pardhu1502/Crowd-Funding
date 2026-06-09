import type { Request, Response, NextFunction } from "express";
import { getCampaigns as getCampaignsService, createCampaign as createCampaignService,   getCampaignById as getCampaignByIdService, } from "../services/campaign.service";
import type { CreateCampaignInput } from "../types/campaign.types";

export const getCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
  const campaigns = await getCampaignsService();

  res.status(200).json({
    success: true,
    data: campaigns,
  });
}
catch(error){
  next(error);
}
};

export const createCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  const data: CreateCampaignInput = req.body;

  const campaign = await createCampaignService(data);

  res.status(201).json({
    success: true,
    data: campaign,
  });
}
catch(error){
  next(error);
}
};

export const getCampaignById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const campaign = await getCampaignByIdService(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};