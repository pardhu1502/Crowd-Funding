import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

import type { CreateDonationInput } from "../types/donation.types";

export const createDonation = async(
    userId: string,
    data: CreateDonationInput,
) => {
    const campaign =
    await prisma.campaign.findUnique({
      where: {
        id: data.campaignId,
      },
    });

  if (!campaign) {
    throw new AppError(
      "Campaign not found",
      404
    );
  }

  const result =
    await prisma.$transaction(
      async (tx) => {

        const donation =
          await tx.donation.create({
            data: {
              amount: data.amount,
              donorId: userId,
              campaignId: data.campaignId,
            },
          });

        await tx.campaign.update({
          where: {
            id: data.campaignId,
          },
          data: {
            currentAmount: {
              increment: data.amount,
            },
          },
        });

        return donation;
      }
    );

  return result;
};


export const getCampaignDonations = async (
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

  return prisma.donation.findMany({
    where: {
      campaignId,
    },
    include: {
      donor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};