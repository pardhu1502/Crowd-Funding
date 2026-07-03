import type { Request,Response,NextFunction, } from "express";
import { createDonation } from "../services/donation.service";
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