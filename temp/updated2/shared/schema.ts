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

// HCP (Healthcare Provider) schema
export const hcps = pgTable("hcps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  prescribingPattern: text("prescribing_pattern"),
  engagementScore: integer("engagement_score"),
  tag: text("tag"),
  email: text("email"),
  organization: text("organization"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertHcpSchema = createInsertSchema(hcps).pick({
  name: true,
  specialty: true,
  prescribingPattern: true,
  engagementScore: true,
  tag: true,
  email: true,
  organization: true,
  notes: true,
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
