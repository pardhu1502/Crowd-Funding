import type {
    Request,
    Response,
    NextFunction,
} from "express";

import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError"
import { env } from "../config/env";

interface JwtPayload {
    userId: string;
    email: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      throw new AppError(
        "Authentication required",
        401
      );
    }

    const token =
      authHeader.split(" ")[1];

    if (!token) {
      throw new AppError(
        "Authentication required",
        401
      );
    }

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
  if (error instanceof AppError) {
    return next(error);
  }

  next(
    new AppError(
      "Invalid or expired token",
      401
    )
  );
  }
};