import { z } from "zod";
export const createCampaignSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    goalAmount: z
        .number()
        .positive("Goal amount must be greater than 0"),
    creatorId: z
        .string()
        .min(1, "Creator ID is required"),
});
//# sourceMappingURL=campaign.validator.js.map