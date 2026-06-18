import type { Request, Response, NextFunction } from "express";
import { getCampaigns as getCampaignsService,
         createCampaign as createCampaignService,
         getCampaignById as getCampaignByIdService,
         updateCampaign as updateCampaignService,
         deleteCampaign as deleteCampaignService,     
} from "../services/campaign.service";
import type { CreateCampaignInput,
              UpdateCampaignInput,
} from "../types/campaign.types";

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

export const updateCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const campaign =
      await updateCampaignService(
        req.params.id as string,
        req.body as UpdateCampaignInput
      );

    res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCampaign = async(
  req: Request,
  res: Response,
  next: NextFunction,
)=>{
  try{
    await deleteCampaignService(
      req.params.id as string
    );

    res.status(200).json({
      success:true,
      message:"Campaign deleted successfully",
    });
  }
  catch(error){
    next(error);
  }
};