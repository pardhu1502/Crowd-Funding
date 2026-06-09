import prisma from "../config/prisma";
import type { CreateCampaignInput } from "../types/campaign.types";
import { AppError } from "../utils/AppError";


export const getCampaigns = async () => {
  const campaigns = await prisma.campaign.findMany();

  return campaigns;
};

export const createCampaign = async (data: CreateCampaignInput) =>{
const campaign= await prisma.campaign.create({
  data:{
    title: data.title,
    description: data.description,
    goalAmount: data.goalAmount,
    creatorId: data.creatorId,
  },
});

return campaign;
};

export const getCampaignById = async (
  campaignId: string
) => {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: campaignId,
    },
  });

  if (!campaign) {
    throw new AppError(
      "Campaign not found",
      404
    );
  }

  return campaign;
};