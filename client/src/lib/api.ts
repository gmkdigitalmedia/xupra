import { apiRequest } from "./queryClient";

// HCP related API endpoints
export const uploadHcpData = async (data: FormData) => {
  return apiRequest("POST", "/api/hcp/upload", data);
};

export const getHcps = async () => {
  return apiRequest("GET", "/api/hcp").then(res => res.json());
};

export const tagHcp = async (id: string, tag: string) => {
  return apiRequest("PUT", `/api/hcp/${id}/tag`, { tag });
};

// Content related API endpoints
export const generateContent = async (data: {
  hcp: string;
  contentType: string;
  productFocus: string;
  keyMessage?: string;
}) => {
  return apiRequest("POST", "/api/content/generate", data).then(res => res.json());
};

export const saveContent = async (data: {
  title: string;
  hcp: string;
  type: string;
  content: string;
  subject?: string;
}) => {
  return apiRequest("POST", "/api/content", data);
};

export const getContent = async () => {
  return apiRequest("GET", "/api/content").then(res => res.json());
};

// Campaign related API endpoints
export const generateCampaignPlan = async (data: {
  hcpSegment: string;
  content: string;
}) => {
  return apiRequest("POST", "/api/campaign/plan", data).then(res => res.json());
};

export const getCampaigns = async () => {
  return apiRequest("GET", "/api/campaign").then(res => res.json());
};

export const createCampaign = async (data: {
  name: string;
  target: string;
  channels: string[];
  startDate: string;
  endDate: string;
}) => {
  return apiRequest("POST", "/api/campaign", data);
};

// Analytics related API endpoints
export const getCampaignAnalytics = async (campaignId: string) => {
  return apiRequest("GET", `/api/analytics/campaign/${campaignId}`).then(res => res.json());
};

export const getInsights = async (campaignId: string) => {
  return apiRequest("GET", `/api/analytics/insights/${campaignId}`).then(res => res.json());
};

// Asset related API endpoints
export const uploadAsset = async (data: FormData) => {
  return apiRequest("POST", "/api/asset/upload", data);
};

export const getAssets = async () => {
  return apiRequest("GET", "/api/asset").then(res => res.json());
};

export const deleteAsset = async (id: string) => {
  return apiRequest("DELETE", `/api/asset/${id}`);
};
