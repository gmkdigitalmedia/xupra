import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Basic user schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  organization: text("organization"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  organization: true,
});

// API Connection schema
export const apiConnections = pgTable("api_connections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  service: text("service").notNull(), // 'veeva', 'salesforce', 'slack', 'google', 'oncore'
  apiKey: text("api_key"),
  apiSecret: text("api_secret"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  clientId: text("client_id"),
  clientSecret: text("client_secret"),
  baseUrl: text("base_url"),
  additionalConfig: jsonb("additional_config"),
  isActive: boolean("is_active").default(true),
  lastTested: timestamp("last_tested"),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertApiConnectionSchema = createInsertSchema(apiConnections).pick({
  name: true,
  service: true,
  apiKey: true,
  apiSecret: true,
  accessToken: true,
  refreshToken: true,
  clientId: true,
  clientSecret: true,
  baseUrl: true,
  additionalConfig: true,
  isActive: true,
  createdBy: true,
});

// HCP (Healthcare Provider) schema
export const hcps = pgTable("hcps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  subSpecialty: text("sub_specialty"),
  prescribingPattern: text("prescribing_pattern"),
  engagementScore: integer("engagement_score"),
  tag: text("tag"),
  email: text("email"),
  organization: text("organization"),
  notes: text("notes"),
  
  // Geographic Data
  location: text("location"), // City, state, or specific region
  region: text("region"), // Broader region (e.g., Northeast, Southwest)
  urbanRural: text("urban_rural"), // Urban, Suburban, Rural classification
  
  // Affiliation Data
  hospitalAffiliation: text("hospital_affiliation"), // Primary hospital affiliation
  academicAffiliation: text("academic_affiliation"), // Academic institution affiliations
  professionalAssociations: text("professional_associations").array(), // Professional association memberships
  
  // Influence Data
  influenceScore: integer("influence_score"), // Score measuring overall influence
  isKol: boolean("is_kol").default(false), // Key Opinion Leader flag
  publicationCount: integer("publication_count"), // Number of research publications
  speakingEngagements: integer("speaking_engagements"), // Number of speaking events per year
  
  // Patient Demographics
  patientAgeGroup: text("patient_age_group").array(), // Age groups of patients (pediatric, adult, geriatric)
  patientConditions: text("patient_conditions").array(), // Common conditions treated
  patientInsuranceTypes: text("patient_insurance_types").array(), // Types of insurance accepted
  
  // Engagement Preferences
  preferredContactMethod: text("preferred_contact_method"), // Email, phone, in-person, etc.
  preferredContactTime: text("preferred_contact_time"), // Morning, afternoon, etc.
  digitalEngagementLevel: text("digital_engagement_level"), // High, medium, low
  
  // Compliance
  hasOptOut: boolean("has_opt_out").default(false), // Whether the HCP has opted out of communications
  privacyRestrictions: jsonb("privacy_restrictions"), // Specific privacy restrictions
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertHcpSchema = createInsertSchema(hcps).pick({
  name: true,
  specialty: true,
  subSpecialty: true,
  prescribingPattern: true,
  engagementScore: true,
  tag: true,
  email: true,
  organization: true,
  notes: true,
  
  // Geographic Data
  location: true,
  region: true, 
  urbanRural: true,
  
  // Affiliation Data
  hospitalAffiliation: true,
  academicAffiliation: true,
  professionalAssociations: true,
  
  // Influence Data
  influenceScore: true,
  isKol: true,
  publicationCount: true,
  speakingEngagements: true,
  
  // Patient Demographics
  patientAgeGroup: true,
  patientConditions: true,
  patientInsuranceTypes: true,
  
  // Engagement Preferences
  preferredContactMethod: true,
  preferredContactTime: true,
  digitalEngagementLevel: true,
  
  // Compliance
  hasOptOut: true,
  privacyRestrictions: true,
});

// Content schema
export const contents = pgTable("contents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  hcp: text("hcp").notNull(),
  type: text("type").notNull(),
  subject: text("subject"),
  content: text("content").notNull(),
  compliance: jsonb("compliance"),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertContentSchema = createInsertSchema(contents).pick({
  title: true,
  hcp: true,
  type: true,
  subject: true,
  content: true,
  compliance: true,
  createdBy: true,
});

// Campaign schema
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  target: text("target").notNull(),
  channels: text("channels").array().notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: text("status").notNull().default("planned"),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCampaignSchema = createInsertSchema(campaigns).pick({
  name: true,
  target: true,
  channels: true,
  startDate: true,
  endDate: true,
  status: true,
  createdBy: true,
});

// Asset schema
export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  size: text("size").notNull(),
  url: text("url").notNull(),
  tags: text("tags").array(),
  uploadedBy: text("uploaded_by"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const insertAssetSchema = createInsertSchema(assets).pick({
  name: true,
  type: true,
  size: true,
  url: true,
  tags: true,
  uploadedBy: true,
});

// Activity schema
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  activity: text("activity").notNull(),
  user: text("user").notNull(),
  date: timestamp("date").defaultNow(),
  status: text("status").notNull(),
  relatedTo: text("related_to"),
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  activity: true,
  user: true,
  status: true,
  relatedTo: true,
});

// Types for TypeScript
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertApiConnection = z.infer<typeof insertApiConnectionSchema>;
export type ApiConnection = typeof apiConnections.$inferSelect;

export type InsertHcp = z.infer<typeof insertHcpSchema>;
export type Hcp = typeof hcps.$inferSelect;

export type InsertContent = z.infer<typeof insertContentSchema>;
export type Content = typeof contents.$inferSelect;

export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;

export type InsertAsset = z.infer<typeof insertAssetSchema>;
export type Asset = typeof assets.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
