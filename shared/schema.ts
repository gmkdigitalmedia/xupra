import { pgTable, text, serial, integer, boolean, timestamp, jsonb, json, index, varchar, foreignKey } from "drizzle-orm/pg-core";
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

// ******************** InteractCraft AI Schemas ********************

// Common engagement participants schema (for all engagement types)
export const engagementParticipants = pgTable("engagement_participants", {
  id: serial("id").primaryKey(),
  engagementId: integer("engagement_id").notNull(),
  engagementType: text("engagement_type").notNull(), // 'advisory_board', 'discussion_forum', 'delphi_survey'
  userId: integer("user_id").notNull(),
  role: text("role").notNull(), // 'moderator', 'participant', 'observer', 'admin'
  status: text("status").notNull().default("invited"), // 'invited', 'accepted', 'declined', 'active', 'inactive'
  joinedAt: timestamp("joined_at"),
  lastActiveAt: timestamp("last_active_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => {
  return {
    userEngagementIdx: index("user_engagement_idx").on(table.userId, table.engagementId, table.engagementType),
  };
});

export const insertEngagementParticipantSchema = createInsertSchema(engagementParticipants).omit({
  id: true,
  joinedAt: true,
  lastActiveAt: true,
  createdAt: true,
  updatedAt: true,
});

// 1. Virtual Advisory Boards
export const advisoryBoards = pgTable("advisory_boards", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  objective: text("objective").notNull(),
  status: text("status").notNull().default("draft"), // 'draft', 'scheduled', 'in_progress', 'completed', 'cancelled'
  format: text("format").notNull(), // 'video', 'audio', 'text', 'hybrid'
  isPublic: boolean("is_public").default(false),
  scheduledStartTime: timestamp("scheduled_start_time"),
  scheduledEndTime: timestamp("scheduled_end_time"),
  actualStartTime: timestamp("actual_start_time"),
  actualEndTime: timestamp("actual_end_time"),
  maxParticipants: integer("max_participants"),
  recordingEnabled: boolean("recording_enabled").default(false),
  recordingUrl: text("recording_url"),
  transcriptEnabled: boolean("transcript_enabled").default(false),
  transcriptUrl: text("transcript_url"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAdvisoryBoardSchema = createInsertSchema(advisoryBoards).omit({
  id: true,
  actualStartTime: true,
  actualEndTime: true,
  recordingUrl: true,
  transcriptUrl: true,
  createdAt: true,
  updatedAt: true,
});

// Advisory board agenda items
export const advisoryBoardAgendaItems = pgTable("advisory_board_agenda_items", {
  id: serial("id").primaryKey(),
  boardId: integer("board_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  duration: integer("duration"), // in minutes
  type: text("type").notNull(), // 'presentation', 'discussion', 'qa', 'break', 'survey'
  order: integer("order").notNull(),
  presenterIds: integer("presenter_ids").array(),
  materials: jsonb("materials"), // URLs, document IDs, etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => {
  return {
    boardIdx: index("board_agenda_idx").on(table.boardId),
    fk: foreignKey({ columns: [table.boardId], foreignColumns: [advisoryBoards.id] })
  };
});

export const insertAdvisoryBoardAgendaItemSchema = createInsertSchema(advisoryBoardAgendaItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// 2. Asynchronous Discussion Forums
export const discussionForums = pgTable("discussion_forums", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("draft"), // 'draft', 'active', 'archived', 'closed'
  category: text("category"),
  isModerated: boolean("is_moderated").default(true),
  isPublic: boolean("is_public").default(false),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertDiscussionForumSchema = createInsertSchema(discussionForums).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Discussion topics
export const discussionTopics = pgTable("discussion_topics", {
  id: serial("id").primaryKey(),
  forumId: integer("forum_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  status: text("status").notNull().default("open"), // 'open', 'closed', 'pinned', 'hidden'
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  lastActivityAt: timestamp("last_activity_at").defaultNow(),
  views: integer("views").default(0),
  attachments: jsonb("attachments"),
}, (table) => {
  return {
    forumIdx: index("forum_topic_idx").on(table.forumId),
    fk: foreignKey({ columns: [table.forumId], foreignColumns: [discussionForums.id] })
  };
});

export const insertDiscussionTopicSchema = createInsertSchema(discussionTopics).omit({
  id: true,
  lastActivityAt: true,
  views: true,
  createdAt: true,
  updatedAt: true,
});

// Discussion posts (replies)
export const discussionPosts = pgTable("discussion_posts", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").notNull(),
  content: text("content").notNull(),
  parentId: integer("parent_id"), // For replies to other posts (threading)
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isEdited: boolean("is_edited").default(false),
  attachments: jsonb("attachments"),
  reactions: jsonb("reactions"), // Store reactions like likes, etc.
}, (table) => {
  return {
    topicIdx: index("topic_post_idx").on(table.topicId),
    parentIdx: index("parent_post_idx").on(table.parentId),
    fk: foreignKey({ columns: [table.topicId], foreignColumns: [discussionTopics.id] })
  };
});

export const insertDiscussionPostSchema = createInsertSchema(discussionPosts).omit({
  id: true,
  isEdited: true,
  createdAt: true,
  updatedAt: true,
});

// 3. Consensus-Building Surveys (Delphi Panels)
export const delphiSurveys = pgTable("delphi_surveys", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  objective: text("objective").notNull(), 
  status: text("status").notNull().default("draft"), // 'draft', 'active', 'completed', 'cancelled'
  currentRound: integer("current_round").default(1),
  totalRounds: integer("total_rounds").notNull(),
  isAnonymous: boolean("is_anonymous").default(true),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  consensusThreshold: integer("consensus_threshold"), // Percentage threshold for consensus
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertDelphiSurveySchema = createInsertSchema(delphiSurveys).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Delphi survey rounds
export const delphiRounds = pgTable("delphi_rounds", {
  id: serial("id").primaryKey(),
  surveyId: integer("survey_id").notNull(),
  roundNumber: integer("round_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"), // 'pending', 'active', 'completed'
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  feedbackSummary: text("feedback_summary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => {
  return {
    surveyRoundIdx: index("survey_round_idx").on(table.surveyId, table.roundNumber),
    fk: foreignKey({ columns: [table.surveyId], foreignColumns: [delphiSurveys.id] })
  };
});

export const insertDelphiRoundSchema = createInsertSchema(delphiRounds).omit({
  id: true,
  feedbackSummary: true,
  createdAt: true,
  updatedAt: true,
});

// Delphi questions
export const delphiQuestions = pgTable("delphi_questions", {
  id: serial("id").primaryKey(),
  roundId: integer("round_id").notNull(),
  questionText: text("question_text").notNull(),
  questionType: text("question_type").notNull(), // 'likert', 'multiple_choice', 'open_ended', 'ranking'
  options: jsonb("options"), // For multiple choice/likert questions
  required: boolean("required").default(true),
  order: integer("order").notNull(),
  previousConsensus: jsonb("previous_consensus"), // Data from previous rounds if applicable
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => {
  return {
    roundIdx: index("round_question_idx").on(table.roundId),
    fk: foreignKey({ columns: [table.roundId], foreignColumns: [delphiRounds.id] })
  };
});

export const insertDelphiQuestionSchema = createInsertSchema(delphiQuestions).omit({
  id: true,
  previousConsensus: true,
  createdAt: true,
  updatedAt: true,
});

// Delphi responses
export const delphiResponses = pgTable("delphi_responses", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").notNull(),
  userId: integer("user_id").notNull(),
  response: jsonb("response").notNull(), // Could be different formats based on question type
  rationale: text("rationale"), // Optional explanation for the response
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => {
  return {
    userQuestionIdx: index("user_question_idx").on(table.userId, table.questionId),
    fk: foreignKey({ columns: [table.questionId], foreignColumns: [delphiQuestions.id] })
  };
});

export const insertDelphiResponseSchema = createInsertSchema(delphiResponses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// AI-generated content for InteractCraft
export const aiAnalysis = pgTable("ai_analysis", {
  id: serial("id").primaryKey(),
  sourceType: text("source_type").notNull(), // 'advisory_board', 'discussion_forum', 'delphi_survey'
  sourceId: integer("source_id").notNull(),
  analysisType: text("analysis_type").notNull(), // 'summary', 'sentiment', 'key_points', 'recommendations'
  content: text("content").notNull(),
  metadata: jsonb("metadata"), // Additional analysis data, like sentiment scores
  aiModel: text("ai_model").notNull(), // The model used for generation
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAiAnalysisSchema = createInsertSchema(aiAnalysis).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types for TypeScript - InteractCraft
export type InsertEngagementParticipant = z.infer<typeof insertEngagementParticipantSchema>;
export type EngagementParticipant = typeof engagementParticipants.$inferSelect;

export type InsertAdvisoryBoard = z.infer<typeof insertAdvisoryBoardSchema>;
export type AdvisoryBoard = typeof advisoryBoards.$inferSelect;

export type InsertAdvisoryBoardAgendaItem = z.infer<typeof insertAdvisoryBoardAgendaItemSchema>;
export type AdvisoryBoardAgendaItem = typeof advisoryBoardAgendaItems.$inferSelect;

export type InsertDiscussionForum = z.infer<typeof insertDiscussionForumSchema>;
export type DiscussionForum = typeof discussionForums.$inferSelect;

export type InsertDiscussionTopic = z.infer<typeof insertDiscussionTopicSchema>;
export type DiscussionTopic = typeof discussionTopics.$inferSelect;

export type InsertDiscussionPost = z.infer<typeof insertDiscussionPostSchema>;
export type DiscussionPost = typeof discussionPosts.$inferSelect;

export type InsertDelphiSurvey = z.infer<typeof insertDelphiSurveySchema>;
export type DelphiSurvey = typeof delphiSurveys.$inferSelect;

export type InsertDelphiRound = z.infer<typeof insertDelphiRoundSchema>;
export type DelphiRound = typeof delphiRounds.$inferSelect;

export type InsertDelphiQuestion = z.infer<typeof insertDelphiQuestionSchema>;
export type DelphiQuestion = typeof delphiQuestions.$inferSelect;

export type InsertDelphiResponse = z.infer<typeof insertDelphiResponseSchema>;
export type DelphiResponse = typeof delphiResponses.$inferSelect;

export type InsertAiAnalysis = z.infer<typeof insertAiAnalysisSchema>;
export type AiAnalysis = typeof aiAnalysis.$inferSelect;
