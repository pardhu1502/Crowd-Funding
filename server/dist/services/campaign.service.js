import prisma from "../config/prisma";
export const getCampaigns = async () => {
    const campaigns = await prisma.campaign.findMany();
    return campaigns;
};
export const createCampaign = async (data) => {
    const campaign = await prisma.campaign.create({
        data: {
            title: data.title,
            description: data.description,
            goalAmount: data.goalAmount,
            creatorId: data.creatorId,
        },
    });
    return campaign;
};
//# sourceMappingURL=campaign.service.js.map