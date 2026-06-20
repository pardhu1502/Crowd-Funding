import type { Request,Response,NextFunction, } from "express";
import { registerUser,loginUser } from "../services/auth.service";
import type { RegisterInput, LoginInput, } from "../types/auth.types";
import { success } from "zod";

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

export const login = async(
    req: Request,
    res: Response,
    next: NextFunction,
)=> {
    try {
        const result = await loginUser(
      req.body as LoginInput
    );

    res.status(200).json({
        success: true,
        data: result,
    })
    }
    catch(error){
        next(error);
    }
}