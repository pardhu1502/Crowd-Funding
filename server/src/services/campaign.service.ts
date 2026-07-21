import prisma from "../config/prisma";
import type { CreateCampaignInput,UpdateCampaignInput, } from "../types/campaign.types";
import { AppError } from "../utils/AppError";
import { CampaignStatus } from "@prisma/client";


// export const getCampaigns = async () => {
//   const campaigns = await prisma.campaign.findMany();

//   return campaigns;
// };

export const getCampaigns = async (
  page = 1,
  limit = 10,
  search?: string,
  status?:CampaignStatus
) => {
  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      title: {
        contains: search,
        mode: "insensitive" as const,
      },
    }),

    ...(status && {
      status,
    }),
  };

  const campaigns = await prisma.campaign.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.campaign.count({
    where,
  });

  return {
    campaigns,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
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


export const updateCampaign = async (
  campaignId: string,
  userId: string,
  data: UpdateCampaignInput
) => {
  const existingCampaign =
    await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
    });

  if (!existingCampaign) {
    throw new AppError(
      "Campaign not found",
      404
    );
  }

  if(existingCampaign.creatorId !== userId){
    throw new AppError(
      "You are not authorized to perform this action",
      403
    );
  }

  const updatedCampaign =
    await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data,
    });

  return updatedCampaign;
};

export const deleteCampaign = async (
  campaignId: string,
  userId: string
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

  if (campaign.creatorId !== userId) {
    throw new AppError(
      "You are not authorized to perform this action",
      403
    );
  }

  await prisma.campaign.delete({
    where: {
      id: campaignId,
    },
  });

  return;
};