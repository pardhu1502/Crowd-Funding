import type { Request,Response,NextFunction, } from "express";
import { createDonation, getCampaignDonations } from "../services/donation.service";
import type { CreateDonationInput } from "../types/donation.types";

export const donate = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try{
        const donation = await createDonation(
            req.user.userId,
            req.body as CreateDonationInput
        );
        res.status(201).json({
            success: true,
            data: donation,
        })
    }
    catch(error){
        next(error);
    }
};

export const getDonations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const donations =
      await getCampaignDonations(
        req.params.id as string
      );

    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (error) {
    next(error);
  }
};