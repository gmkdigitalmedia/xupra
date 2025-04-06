// Define the Healthcare Professional type
export interface Hcp {
  id: number;
  name: string;
  email?: string;
  specialty: string;
  location?: string;
  organization?: string;
  influenceScore?: number;
  tag?: string;
  isKol?: boolean;
  coordinates?: [number, number]; // [longitude, latitude]
  connections?: number[];
  prescribingPattern?: string;
  engagementScore?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the API Connection types
export interface ApiConnection {
  id: number;
  service: string;
  name: string;
  apiKey: string;
  isActive: boolean;
  lastTested?: Date;
  config?: Record<string, any>;
}

// Define the Content types
export interface Content {
  id: number;
  title: string;
  type: string;
  body: string;
  tags: string[];
  status: string;
  createdBy?: string;
  targetAudience?: string;
  engagementMetrics?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Campaign types
export interface Campaign {
  id: number;
  name: string;
  description?: string;
  status: string;
  startDate?: Date;
  endDate?: Date;
  targetHcps?: number[];
  contentIds?: number[];
  metrics?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Asset types
export interface Asset {
  id: number;
  name: string;
  type: string;
  url: string;
  size?: number;
  metadata?: Record<string, any>;
  uploadedAt: Date;
}

// Define the Activity types
export interface Activity {
  id: number;
  type: string;
  description: string;
  entityType: string;
  entityId: number;
  metadata?: Record<string, any>;
  date: Date;
}