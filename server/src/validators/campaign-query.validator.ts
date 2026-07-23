import { z } from "zod";
import { CampaignStatus } from "@prisma/client";

export const campaignQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive()
    .optional(),

  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .optional(),

  search: z.string().optional(),

  status: z.nativeEnum(CampaignStatus).optional(),
});