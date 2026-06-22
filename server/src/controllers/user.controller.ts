import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { getProfile } from "../services/user.service";

export const getCurrentUser = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try{
        const user = await getProfile(
            req.user.userId
        );

        res.status(200).json({
            success:true,
            data: user,
        });
    }
    catch(error){
        next(error);
    }
};