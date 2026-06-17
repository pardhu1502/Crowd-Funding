export interface CreateCampaignInput {
  title: string;
  description: string;
  goalAmount: number;
  creatorId: string;
}

export interface UpdateCampaignInput {
  title?: string;
  description?: string;
  goalAmount?: number;
}