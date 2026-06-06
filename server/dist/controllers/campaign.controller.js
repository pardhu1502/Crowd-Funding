import { getCampaigns as getCampaignsService, createCampaign as createCampaignService, } from "../services/campaign.service";
export const getCampaigns = async (req, res) => {
    const campaigns = await getCampaignsService();
    res.status(200).json({
        success: true,
        data: campaigns,
    });
};
export const createCampaign = async (req, res) => {
    const data = req.body;
    const campaign = await createCampaignService(data);
    res.status(201).json({
        success: true,
        data: campaign,
    });
};
//# sourceMappingURL=campaign.controller.js.map