import { 
  users, User, InsertUser, 
  hcps, Hcp, InsertHcp,
  contents, Content, InsertContent,
  campaigns, Campaign, InsertCampaign,
  assets, Asset, InsertAsset,
  activities, Activity, InsertActivity
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // HCP operations
  getHcps(): Promise<Hcp[]>;
  getHcp(id: number): Promise<Hcp | undefined>;
  createHcp(hcp: InsertHcp): Promise<Hcp>;
  updateHcp(id: number, hcp: Partial<InsertHcp>): Promise<Hcp | undefined>;
  deleteHcp(id: number): Promise<boolean>;
  
  // Content operations
  getContents(): Promise<Content[]>;
  getContent(id: number): Promise<Content | undefined>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: number, content: Partial<InsertContent>): Promise<Content | undefined>;
  deleteContent(id: number): Promise<boolean>;
  
  // Campaign operations
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: number, campaign: Partial<InsertCampaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: number): Promise<boolean>;
  
  // Asset operations
  getAssets(): Promise<Asset[]>;
  getAsset(id: number): Promise<Asset | undefined>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAsset(id: number, asset: Partial<InsertAsset>): Promise<Asset | undefined>;
  deleteAsset(id: number): Promise<boolean>;
  
  // Activity operations
  getActivities(): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private hcps: Map<number, Hcp>;
  private contents: Map<number, Content>;
  private campaigns: Map<number, Campaign>;
  private assets: Map<number, Asset>;
  private activities: Map<number, Activity>;
  
  private userCurrentId: number;
  private hcpCurrentId: number;
  private contentCurrentId: number;
  private campaignCurrentId: number;
  private assetCurrentId: number;
  private activityCurrentId: number;

  constructor() {
    this.users = new Map();
    this.hcps = new Map();
    this.contents = new Map();
    this.campaigns = new Map();
    this.assets = new Map();
    this.activities = new Map();
    
    this.userCurrentId = 1;
    this.hcpCurrentId = 1;
    this.contentCurrentId = 1;
    this.campaignCurrentId = 1;
    this.assetCurrentId = 1;
    this.activityCurrentId = 1;
    
    // Initialize with a default admin user
    this.createUser({
      username: "admin",
      password: "admin",
      role: "admin",
      organization: "Xupra Demo"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // HCP operations
  async getHcps(): Promise<Hcp[]> {
    return Array.from(this.hcps.values());
  }

  async getHcp(id: number): Promise<Hcp | undefined> {
    return this.hcps.get(id);
  }

  async createHcp(insertHcp: InsertHcp): Promise<Hcp> {
    const id = this.hcpCurrentId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const hcp: Hcp = { ...insertHcp, id, createdAt, updatedAt };
    this.hcps.set(id, hcp);
    
    // Create activity for HCP creation
    this.createActivity({
      activity: `HCP "${insertHcp.name}" created`,
      user: "John Doe",
      status: "Completed",
      relatedTo: "HCP",
    });
    
    return hcp;
  }

  async updateHcp(id: number, hcp: Partial<InsertHcp>): Promise<Hcp | undefined> {
    const existingHcp = this.hcps.get(id);
    if (!existingHcp) return undefined;
    
    const updatedHcp: Hcp = { 
      ...existingHcp, 
      ...hcp, 
      updatedAt: new Date() 
    };
    
    this.hcps.set(id, updatedHcp);
    return updatedHcp;
  }

  async deleteHcp(id: number): Promise<boolean> {
    return this.hcps.delete(id);
  }

  // Content operations
  async getContents(): Promise<Content[]> {
    return Array.from(this.contents.values());
  }

  async getContent(id: number): Promise<Content | undefined> {
    return this.contents.get(id);
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const id = this.contentCurrentId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const content: Content = { ...insertContent, id, createdAt, updatedAt };
    this.contents.set(id, content);
    
    // Create activity for content creation
    this.createActivity({
      activity: `Content "${insertContent.title}" created`,
      user: insertContent.createdBy || "John Doe",
      status: "Completed",
      relatedTo: "Content",
    });
    
    return content;
  }

  async updateContent(id: number, content: Partial<InsertContent>): Promise<Content | undefined> {
    const existingContent = this.contents.get(id);
    if (!existingContent) return undefined;
    
    const updatedContent: Content = { 
      ...existingContent, 
      ...content, 
      updatedAt: new Date() 
    };
    
    this.contents.set(id, updatedContent);
    return updatedContent;
  }

  async deleteContent(id: number): Promise<boolean> {
    return this.contents.delete(id);
  }

  // Campaign operations
  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = this.campaignCurrentId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const campaign: Campaign = { ...insertCampaign, id, createdAt, updatedAt };
    this.campaigns.set(id, campaign);
    
    // Create activity for campaign creation
    this.createActivity({
      activity: `Campaign "${insertCampaign.name}" created`,
      user: insertCampaign.createdBy || "John Doe",
      status: "Completed",
      relatedTo: "Campaign",
    });
    
    return campaign;
  }

  async updateCampaign(id: number, campaign: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const existingCampaign = this.campaigns.get(id);
    if (!existingCampaign) return undefined;
    
    const updatedCampaign: Campaign = { 
      ...existingCampaign, 
      ...campaign, 
      updatedAt: new Date() 
    };
    
    this.campaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  async deleteCampaign(id: number): Promise<boolean> {
    return this.campaigns.delete(id);
  }

  // Asset operations
  async getAssets(): Promise<Asset[]> {
    return Array.from(this.assets.values());
  }

  async getAsset(id: number): Promise<Asset | undefined> {
    return this.assets.get(id);
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const id = this.assetCurrentId++;
    const uploadedAt = new Date();
    const asset: Asset = { ...insertAsset, id, uploadedAt };
    this.assets.set(id, asset);
    
    // Create activity for asset upload
    this.createActivity({
      activity: `Asset "${insertAsset.name}" uploaded`,
      user: insertAsset.uploadedBy || "John Doe",
      status: "Completed",
      relatedTo: "Asset",
    });
    
    return asset;
  }

  async updateAsset(id: number, asset: Partial<InsertAsset>): Promise<Asset | undefined> {
    const existingAsset = this.assets.get(id);
    if (!existingAsset) return undefined;
    
    const updatedAsset: Asset = { 
      ...existingAsset, 
      ...asset
    };
    
    this.assets.set(id, updatedAsset);
    return updatedAsset;
  }

  async deleteAsset(id: number): Promise<boolean> {
    return this.assets.delete(id);
  }

  // Activity operations
  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    return this.activities.get(id);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.activityCurrentId++;
    const date = new Date();
    const activity: Activity = { ...insertActivity, id, date };
    this.activities.set(id, activity);
    return activity;
  }
}

export const storage = new MemStorage();
