import type { CreateCampaignInput } from "../types/campaign.types";
export declare const getCampaigns: () => Promise<{
    id: string;
    title: string;
    description: string;
    goalAmount: import("@prisma/client/runtime/library").Decimal;
    currentAmount: import("@prisma/client/runtime/library").Decimal;
    status: import("@prisma/client").$Enums.CampaignStatus;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const createCampaign: (data: CreateCampaignInput) => Promise<{
    id: string;
    title: string;
    description: string;
    goalAmount: import("@prisma/client/runtime/library").Decimal;
    currentAmount: import("@prisma/client/runtime/library").Decimal;
    status: import("@prisma/client").$Enums.CampaignStatus;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=campaign.service.d.ts.map