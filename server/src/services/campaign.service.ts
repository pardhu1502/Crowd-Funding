import prisma from "../config/prisma";

export const getCampaigns = async () => {
  const campaigns = await prisma.campaign.findMany();

  return campaigns;
};