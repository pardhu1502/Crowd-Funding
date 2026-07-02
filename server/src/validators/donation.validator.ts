import { z } from "zod";

export const createDonationSchema = z.object({
    campaignId: z.uuid("Invalid campaign ID"),

    amount: z.number()
    .positive("Donation amount must be greater than zero"),
});