import { 
  users, User, InsertUser, 
  apiConnections, ApiConnection, InsertApiConnection,
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

  // API Connection operations
  getApiConnections(): Promise<ApiConnection[]>;
  getApiConnectionsByService(service: string): Promise<ApiConnection[]>;
  getApiConnection(id: number): Promise<ApiConnection | undefined>;
  createApiConnection(connection: InsertApiConnection): Promise<ApiConnection>;
  updateApiConnection(id: number, connection: Partial<InsertApiConnection>): Promise<ApiConnection | undefined>;
  deleteApiConnection(id: number): Promise<boolean>;
  updateApiConnectionStatus(id: number, isActive: boolean, lastTested?: Date): Promise<ApiConnection | undefined>;

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
  private apiConnections: Map<number, ApiConnection>;
  private hcps: Map<number, Hcp>;
  private contents: Map<number, Content>;
  private campaigns: Map<number, Campaign>;
  private assets: Map<number, Asset>;
  private activities: Map<number, Activity>;
  
  private userCurrentId: number;
  private apiConnectionCurrentId: number;
  private hcpCurrentId: number;
  private contentCurrentId: number;
  private campaignCurrentId: number;
  private assetCurrentId: number;
  private activityCurrentId: number;

  constructor() {
    this.users = new Map();
    this.apiConnections = new Map();
    this.hcps = new Map();
    this.contents = new Map();
    this.campaigns = new Map();
    this.assets = new Map();
    this.activities = new Map();
    
    this.userCurrentId = 1;
    this.apiConnectionCurrentId = 1;
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
    
    // Initialize with sample API connections
    this.initializeSampleApiConnections();
    
    // Initialize with sample HCP data
    this.initializeSampleHcps();
  }
  
  // Initialize sample API connections
  private async initializeSampleApiConnections() {
    const sampleConnections = [
      {
        name: "Veeva CRM - Production",
        service: "veeva",
        baseUrl: "https://api.veeva.com/api/v1",
        clientId: "veeva_client_id_placeholder",
        clientSecret: "veeva_client_secret_placeholder",
        isActive: true,
        createdBy: "admin"
      },
      {
        name: "Salesforce Marketing Cloud",
        service: "salesforce",
        baseUrl: "https://api.salesforce.com/data/v54.0",
        clientId: "salesforce_client_id_placeholder",
        clientSecret: "salesforce_client_secret_placeholder",
        isActive: true,
        createdBy: "admin"
      },
      {
        name: "Slack Notifications",
        service: "slack",
        baseUrl: "https://slack.com/api",
        apiKey: "xoxb-slack_token_placeholder",
        additionalConfig: {
          defaultChannel: "marketing-updates"
        },
        isActive: false,
        createdBy: "admin"
      },
      {
        name: "Google Workspace",
        service: "google",
        clientId: "google_client_id_placeholder",
        clientSecret: "google_client_secret_placeholder",
        refreshToken: "google_refresh_token_placeholder",
        isActive: false,
        createdBy: "admin"
      },
      {
        name: "Oncore Clinical Trials",
        service: "oncore",
        baseUrl: "https://api.oncore.io/v1",
        apiKey: "oncore_api_key_placeholder",
        isActive: false,
        createdBy: "admin"
      }
    ];
    
    for (const connectionData of sampleConnections) {
      await this.createApiConnection(connectionData);
    }
  }
  
  // Initialize sample HCP data
  private async initializeSampleHcps() {
    const sampleHcps = [
      {
        name: "Dr. Sarah Chen",
        specialty: "Cardiology",
        prescribingPattern: "High Volume",
        engagementScore: 87,
        tag: "Early Adopter",
        email: "sarah.chen@example.com",
        organization: "Metropolis Medical Center",
        notes: "Interested in new cardiovascular treatments"
      },
      {
        name: "Dr. James Wilson",
        specialty: "Oncology",
        prescribingPattern: "Medium Volume",
        engagementScore: 76,
        tag: "Evidence Driven",
        email: "james.wilson@example.com",
        organization: "City Cancer Institute",
        notes: "Requires strong clinical data before adoption"
      },
      {
        name: "Dr. Maria Rodriguez",
        specialty: "Neurology",
        prescribingPattern: "Low Volume",
        engagementScore: 62,
        tag: "Patient Focused",
        email: "maria.rodriguez@example.com",
        organization: "Westside Neuro Center",
        notes: "Emphasizes patient quality of life in treatment decisions"
      },
      {
        name: "Dr. Robert Johnson",
        specialty: "General Practice",
        prescribingPattern: "High Volume",
        engagementScore: 81,
        tag: "Balanced",
        email: "robert.johnson@example.com",
        organization: "Community Family Practice",
        notes: "Considers multiple factors in prescribing decisions"
      },
      {
        name: "Dr. Emily Chang",
        specialty: "Pediatrics",
        prescribingPattern: "Medium Volume",
        engagementScore: 74,
        tag: "Patient Focused",
        email: "emily.chang@example.com",
        organization: "Children's Medical Group",
        notes: "Focused on minimizing side effects in pediatric patients"
      }
    ];
    
    for (const hcpData of sampleHcps) {
      await this.createHcp(hcpData);
    }
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
  
  // API Connection operations
  async getApiConnections(): Promise<ApiConnection[]> {
    return Array.from(this.apiConnections.values());
  }
  
  async getApiConnectionsByService(service: string): Promise<ApiConnection[]> {
    return Array.from(this.apiConnections.values()).filter(
      (connection) => connection.service === service
    );
  }
  
  async getApiConnection(id: number): Promise<ApiConnection | undefined> {
    return this.apiConnections.get(id);
  }
  
  async createApiConnection(connection: InsertApiConnection): Promise<ApiConnection> {
    const id = this.apiConnectionCurrentId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const apiConnection: ApiConnection = { 
      ...connection, 
      id, 
      createdAt, 
      updatedAt,
      isActive: connection.isActive ?? true,
      lastTested: null
    };
    
    this.apiConnections.set(id, apiConnection);
    
    // Create activity for API connection creation
    this.createActivity({
      activity: `API Connection "${connection.name}" for ${connection.service} created`,
      user: connection.createdBy || "admin",
      status: "Completed",
      relatedTo: "API Connection",
    });
    
    return apiConnection;
  }
  
  async updateApiConnection(id: number, connection: Partial<InsertApiConnection>): Promise<ApiConnection | undefined> {
    const existingConnection = this.apiConnections.get(id);
    if (!existingConnection) return undefined;
    
    const updatedConnection: ApiConnection = { 
      ...existingConnection, 
      ...connection, 
      updatedAt: new Date() 
    };
    
    this.apiConnections.set(id, updatedConnection);
    
    // Create activity for API connection update
    this.createActivity({
      activity: `API Connection "${existingConnection.name}" updated`,
      user: connection.createdBy || "admin",
      status: "Completed",
      relatedTo: "API Connection",
    });
    
    return updatedConnection;
  }
  
  async deleteApiConnection(id: number): Promise<boolean> {
    const connection = this.apiConnections.get(id);
    if (connection) {
      this.createActivity({
        activity: `API Connection "${connection.name}" deleted`,
        user: "admin",
        status: "Completed",
        relatedTo: "API Connection",
      });
    }
    return this.apiConnections.delete(id);
  }
  
  async updateApiConnectionStatus(id: number, isActive: boolean, lastTested?: Date): Promise<ApiConnection | undefined> {
    const existingConnection = this.apiConnections.get(id);
    if (!existingConnection) return undefined;
    
    const updatedConnection: ApiConnection = { 
      ...existingConnection, 
      isActive,
      lastTested: lastTested || new Date(),
      updatedAt: new Date() 
    };
    
    this.apiConnections.set(id, updatedConnection);
    
    // Create activity for API connection status update
    this.createActivity({
      activity: `API Connection "${existingConnection.name}" ${isActive ? 'activated' : 'deactivated'}`,
      user: "admin",
      status: "Completed",
      relatedTo: "API Connection",
    });
    
    return updatedConnection;
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
