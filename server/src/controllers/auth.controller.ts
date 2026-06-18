import type { Request,Response,NextFunction, } from "express";
import { registerUser } from "../services/auth.service";
import type { RegisterInput } from "../types/auth.types";

export const register = async (
    req:Request,
    res:Response,
    next:NextFunction,
)=>{
    try{
        const user=await registerUser(
            req.body as RegisterInput
        );

        res.status(201).json({
            success: true,
            data: user,
        });
    }catch(error){
        next(error);
    }
};