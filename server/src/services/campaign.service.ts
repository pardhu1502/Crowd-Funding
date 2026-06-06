import prisma from "../config/prisma";
import type { CreateCampaignInput } from "../types/campaign.types";


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