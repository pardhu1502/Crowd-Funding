import { z } from "zod";
export declare const createCampaignSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    goalAmount: z.ZodNumber;
    creatorId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=campaign.validator.d.ts.map