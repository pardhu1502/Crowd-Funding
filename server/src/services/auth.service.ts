import bcrypt from "bcrypt";
import prisma from "../config/prisma";

import type { RegisterInput } from "../types/auth.types";
import { AppError } from "../utils/AppError";

import jwt from "jsonwebtoken";
import type { LoginInput } from "../types/auth.types";

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

export const loginUser = async (
  data: LoginInput
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash
    );

  if (!isPasswordValid) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};