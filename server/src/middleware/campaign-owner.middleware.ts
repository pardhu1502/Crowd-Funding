import type { Request,Response,NextFunction, } from "express";

import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export const isCampaignOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const campaign =
      await prisma.campaign.findUnique({
        where: {
          id: req.params.id as string,
        },
      });

    if (!campaign) {
      throw new AppError(
        "Campaign not found",
        404
      );
    }

    if (
      campaign.creatorId !==
      req.user.userId
    ) {
      throw new AppError(
        "Forbidden",
        403
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};