import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export const validate =
  (
    schema: ZodSchema,
    source: "body" | "query" | "params" = "body"
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    // Only overwrite req.body because it's writable
    if (source === "body") {
      req.body = result.data;
    }

    next();
  };