import bcrypt from "bcrypt";
import prisma from "../config/prisma";

import type { RegisterInput } from "../types/auth.types";
import { AppError } from "../utils/AppError";

export const registerUser = async (
    data:RegisterInput
)=>{
const existingUser = await prisma.user.findUnique({
    where:{
        email:data.email,
    },
});

if(existingUser){
    throw new AppError(
        "Email already registered",
    400
    );
}

const passwordHash=await bcrypt.hash(data.password,10);

const user= await prisma.user.create({
    data:{
        name:data.name,
        email:data.email,
        passwordHash,
    },
});

return{
    id: user.id,
    name: user.name,
    email:user.email,
};
};