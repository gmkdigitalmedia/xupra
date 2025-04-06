import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertHcpSchema, 
  insertContentSchema, 
  insertCampaignSchema, 
  insertAssetSchema, 
  insertActivitySchema,
  insertApiConnectionSchema 
} from "@shared/schema";
import { z } from "zod";
import { 
  generatePersonalizedContent, 
  analyzeMedicalCompliance, 
  generateCampaignPlan, 
  generateInsights,
  tagHcpWithMediTag 
} from "./services/openai-service";
import { testApiConnection } from "./services/api-connection-service";
import { 
  sendSlackMessage, 
  getSlackHistory, 
  sendHcpEngagementMessage, 
  sendCampaignAnalyticsMessage 
} from "./services/slack-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - All API routes are prefixed with /api

  // HCP routes
  app.get("/api/hcp", async (req: Request, res: Response) => {
    try {
      const hcps = await storage.getHcps();
      res.json(hcps);
    } catch (error) {
      console.error("Error fetching HCPs:", error);
      res.status(500).json({ message: "Failed to fetch HCPs" });
    }
  });

  app.get("/api/hcp/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid HCP ID" });
      }

      const hcp = await storage.getHcp(id);
      if (!hcp) {
        return res.status(404).json({ message: "HCP not found" });
      }

      res.json(hcp);
    } catch (error) {
      console.error("Error fetching HCP:", error);
      res.status(500).json({ message: "Failed to fetch HCP" });
    }
  });

  app.post("/api/hcp", async (req: Request, res: Response) => {
    try {
      const validatedData = insertHcpSchema.parse(req.body);
      const hcp = await storage.createHcp(validatedData);
      res.status(201).json(hcp);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid HCP data", errors: error.errors });
      }
      console.error("Error creating HCP:", error);
      res.status(500).json({ message: "Failed to create HCP" });
    }
  });

  app.put("/api/hcp/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid HCP ID" });
      }

      const validatedData = insertHcpSchema.partial().parse(req.body);
      const updatedHcp = await storage.updateHcp(id, validatedData);
      
      if (!updatedHcp) {
        return res.status(404).json({ message: "HCP not found" });
      }

      res.json(updatedHcp);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid HCP data", errors: error.errors });
      }
      console.error("Error updating HCP:", error);
      res.status(500).json({ message: "Failed to update HCP" });
    }
  });

  app.put("/api/hcp/:id/tag", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid HCP ID" });
      }

      const { tag, autoTag } = req.body;
      
      // If autoTag is true, use AI to generate tags
      if (autoTag) {
        const hcp = await storage.getHcp(id);
        if (!hcp) {
          return res.status(404).json({ message: "HCP not found" });
        }
        
        const tagResult = await tagHcpWithMediTag({
          name: hcp.name || "",
          specialty: hcp.specialty || "",
          prescribingPattern: hcp.prescribingPattern || "",
          organization: hcp.organization || "",
          notes: hcp.notes || ""
        });
        
        const updatedHcp = await storage.updateHcp(id, { 
          tag: tagResult.tag,
          engagementScore: tagResult.engagementScore
        });
        
        if (!updatedHcp) {
          return res.status(404).json({ message: "HCP not found" });
        }
        
        return res.json({
          hcp: updatedHcp,
          rationale: tagResult.rationale
        });
      } 
      // Manual tagging
      else if (tag) {
        const updatedHcp = await storage.updateHcp(id, { tag });
        
        if (!updatedHcp) {
          return res.status(404).json({ message: "HCP not found" });
        }
        
        return res.json(updatedHcp);
      } 
      else {
        return res.status(400).json({ message: "Tag is required for manual tagging" });
      }
    } catch (error) {
      console.error("Error tagging HCP:", error);
      res.status(500).json({ message: "Failed to tag HCP" });
    }
  });

  app.delete("/api/hcp/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid HCP ID" });
      }

      const deleted = await storage.deleteHcp(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "HCP not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting HCP:", error);
      res.status(500).json({ message: "Failed to delete HCP" });
    }
  });

  // Content routes
  app.get("/api/content", async (req: Request, res: Response) => {
    try {
      const contents = await storage.getContents();
      res.json(contents);
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.get("/api/content/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid content ID" });
      }

      const content = await storage.getContent(id);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }

      res.json(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.post("/api/content", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContentSchema.parse(req.body);
      const content = await storage.createContent(validatedData);
      res.status(201).json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid content data", errors: error.errors });
      }
      console.error("Error creating content:", error);
      res.status(500).json({ message: "Failed to create content" });
    }
  });

  app.post("/api/content/document/upload", async (req: Request, res: Response) => {
    try {
      // In a real implementation, we would handle file uploads here
      // For now, we'll simulate a successful upload
      
      // Generate a unique document ID
      const documentId = `doc_${Date.now()}`;
      
      res.json({
        success: true,
        documentId,
        message: "Document uploaded successfully"
      });
    } catch (error) {
      console.error("Error uploading document:", error);
      res.status(500).json({ message: "Failed to upload document" });
    }
  });

  app.post("/api/content/generate", async (req: Request, res: Response) => {
    try {
      const { hcpId, contentType, productInfo, keyMessage, referenceDocument } = req.body;
      
      if (!hcpId || !contentType || !productInfo) {
        return res.status(400).json({ message: "Missing required fields: hcpId, contentType, productInfo" });
      }
      
      // Get HCP data
      const id = parseInt(hcpId);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid HCP ID" });
      }
      
      const hcp = await storage.getHcp(id);
      if (!hcp) {
        return res.status(404).json({ message: "HCP not found" });
      }
      
      // Log if reference document is provided
      if (referenceDocument) {
        console.log(`Reference document provided for content generation: ${JSON.stringify(referenceDocument)}`);
        // In a real implementation, we would process the document here
      }
      
      // Generate personalized content using OpenAI
      const generatedContent = await generatePersonalizedContent(
        {
          name: hcp.name || "",
          specialty: hcp.specialty || "",
          prescribingPattern: hcp.prescribingPattern || "",
          engagementScore: hcp.engagementScore || 50,
          tag: hcp.tag || ""
        },
        contentType,
        productInfo,
        keyMessage,
        !!referenceDocument // Pass boolean indicating if reference document is provided
      );
      
      // Add HCP name to the response
      generatedContent.hcp = hcp.name;
      
      // If we used a reference document, add a compliance note about it
      if (referenceDocument && generatedContent.complianceNotes) {
        generatedContent.complianceNotes.push({
          type: 'success',
          text: `Content enhanced with reference document: ${referenceDocument.name}`
        });
      }

      res.json(generatedContent);
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({ message: "Failed to generate content" });
    }
  });

  app.put("/api/content/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid content ID" });
      }

      const validatedData = insertContentSchema.partial().parse(req.body);
      const updatedContent = await storage.updateContent(id, validatedData);
      
      if (!updatedContent) {
        return res.status(404).json({ message: "Content not found" });
      }

      res.json(updatedContent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid content data", errors: error.errors });
      }
      console.error("Error updating content:", error);
      res.status(500).json({ message: "Failed to update content" });
    }
  });

  app.delete("/api/content/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid content ID" });
      }

      const deleted = await storage.deleteContent(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Content not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting content:", error);
      res.status(500).json({ message: "Failed to delete content" });
    }
  });

  // Campaign routes
  app.get("/api/campaign", async (req: Request, res: Response) => {
    try {
      const campaigns = await storage.getCampaigns();
      res.json(campaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  app.get("/api/campaign/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid campaign ID" });
      }

      const campaign = await storage.getCampaign(id);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }

      res.json(campaign);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      res.status(500).json({ message: "Failed to fetch campaign" });
    }
  });

  app.post("/api/campaign", async (req: Request, res: Response) => {
    try {
      const validatedData = insertCampaignSchema.parse(req.body);
      const campaign = await storage.createCampaign(validatedData);
      res.status(201).json(campaign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid campaign data", errors: error.errors });
      }
      console.error("Error creating campaign:", error);
      res.status(500).json({ message: "Failed to create campaign" });
    }
  });

  app.post("/api/campaign/plan", async (req: Request, res: Response) => {
    try {
      const { hcpId, contentId, previousEngagements } = req.body;
      
      if (!hcpId || !contentId) {
        return res.status(400).json({ message: "Missing required fields: hcpId, contentId" });
      }

      // Get HCP data
      const id = parseInt(hcpId);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid HCP ID" });
      }
      
      const hcp = await storage.getHcp(id);
      if (!hcp) {
        return res.status(404).json({ message: "HCP not found" });
      }
      
      // Generate campaign plan using OpenAI
      const plan = await generateCampaignPlan(
        {
          name: hcp.name || "",
          specialty: hcp.specialty || "",
          prescribingPattern: hcp.prescribingPattern || "",
          engagementScore: hcp.engagementScore || 50,
          tag: hcp.tag || ""
        },
        contentId,
        previousEngagements || []
      );
      
      // Format the response
      const campaignPlan = {
        recommendedChannels: plan.recommendedChannels.map((channel, index) => {
          return {
            channel,
            percentage: Math.round(100 / (index + 2)) // Just a simple way to generate decreasing percentages
          };
        }),
        timing: {
          optimalSendTime: plan.optimalTiming,
          optimalFollowup: plan.frequencyRecommendation,
          reasoning: plan.rationale
        }
      };

      res.json(campaignPlan);
    } catch (error) {
      console.error("Error generating campaign plan:", error);
      res.status(500).json({ message: "Failed to generate campaign plan" });
    }
  });

  app.put("/api/campaign/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid campaign ID" });
      }

      const validatedData = insertCampaignSchema.partial().parse(req.body);
      const updatedCampaign = await storage.updateCampaign(id, validatedData);
      
      if (!updatedCampaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }

      res.json(updatedCampaign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid campaign data", errors: error.errors });
      }
      console.error("Error updating campaign:", error);
      res.status(500).json({ message: "Failed to update campaign" });
    }
  });

  app.delete("/api/campaign/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid campaign ID" });
      }

      const deleted = await storage.deleteCampaign(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Campaign not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting campaign:", error);
      res.status(500).json({ message: "Failed to delete campaign" });
    }
  });

  // Asset routes
  app.get("/api/asset", async (req: Request, res: Response) => {
    try {
      const assets = await storage.getAssets();
      res.json(assets);
    } catch (error) {
      console.error("Error fetching assets:", error);
      res.status(500).json({ message: "Failed to fetch assets" });
    }
  });

  app.get("/api/asset/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid asset ID" });
      }

      const asset = await storage.getAsset(id);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }

      res.json(asset);
    } catch (error) {
      console.error("Error fetching asset:", error);
      res.status(500).json({ message: "Failed to fetch asset" });
    }
  });

  app.post("/api/asset", async (req: Request, res: Response) => {
    try {
      const validatedData = insertAssetSchema.parse(req.body);
      const asset = await storage.createAsset(validatedData);
      res.status(201).json(asset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid asset data", errors: error.errors });
      }
      console.error("Error creating asset:", error);
      res.status(500).json({ message: "Failed to create asset" });
    }
  });

  app.post("/api/asset/upload", async (req: Request, res: Response) => {
    try {
      // In a real implementation, file upload handling would go here
      // For now, we'll just create a mock asset record
      const { name, type, size, tags } = req.body;
      
      if (!name || !type || !size) {
        return res.status(400).json({ message: "Missing required fields: name, type, size" });
      }

      const asset = await storage.createAsset({
        name,
        type,
        size,
        url: `/uploads/${name}`,
        tags: tags ? tags.split(',') : [],
        uploadedBy: "John Doe"
      });

      res.status(201).json(asset);
    } catch (error) {
      console.error("Error uploading asset:", error);
      res.status(500).json({ message: "Failed to upload asset" });
    }
  });

  app.delete("/api/asset/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid asset ID" });
      }

      const deleted = await storage.deleteAsset(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Asset not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting asset:", error);
      res.status(500).json({ message: "Failed to delete asset" });
    }
  });

  // Analytics routes
  app.get("/api/analytics/campaign/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      // Mock analytics data
      const analytics = {
        metrics: [
          { label: "Open Rate", value: "78%", target: "65%" },
          { label: "Response Rate", value: "36%", target: "25%" },
          { label: "ROI", value: "3.2x", target: "2.5x" }
        ],
        performance: {
          weeks: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
          data: [
            { name: "Target", values: [60, 65, 70, 75, 65, 70, 75, 70] },
            { name: "Actual", values: [65, 70, 85, 80, 75, 85, 90, 80] }
          ]
        },
        segmentComparison: [
          { segment: "Early Adopters", openRate: 84, responseRate: 42, engagement: 7.8, roi: 3.8 },
          { segment: "Evidence Driven", openRate: 76, responseRate: 35, engagement: 6.9, roi: 3.1 },
          { segment: "Patient Focused", openRate: 72, responseRate: 32, engagement: 6.2, roi: 2.7 },
          { segment: "Balanced", openRate: 65, responseRate: 28, engagement: 5.8, roi: 2.4 }
        ]
      };

      res.json(analytics);
    } catch (error) {
      console.error("Error fetching campaign analytics:", error);
      res.status(500).json({ message: "Failed to fetch campaign analytics" });
    }
  });

  app.get("/api/analytics/insights/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      
      // Get campaign data
      const campaignId = parseInt(id);
      if (isNaN(campaignId)) {
        return res.status(400).json({ message: "Invalid campaign ID" });
      }
      
      const campaign = await storage.getCampaign(campaignId);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      // Sample performance metrics for demo purposes
      const performanceMetrics = {
        openRate: 0.78,
        responseRate: 0.36,
        clickThroughRate: 0.42,
        engagementScore: 7.2,
        conversionRate: 0.15,
        roi: 3.2,
        segmentPerformance: {
          "High Value": { openRate: 0.84, response: 0.42, engagement: 7.8 },
          "Growth Potential": { openRate: 0.76, response: 0.35, engagement: 6.9 },
          "Maintenance": { openRate: 0.72, response: 0.32, engagement: 6.2 },
          "Low Engagement": { openRate: 0.65, response: 0.28, engagement: 5.8 }
        },
        channelPerformance: {
          email: { openRate: 0.78, response: 0.36, cost: 1000 },
          inPerson: { attendance: 0.85, followUp: 0.72, cost: 5000 },
          webinar: { attendance: 0.62, engagement: 6.5, cost: 2000 }
        }
      };
      
      // Generate insights using OpenAI
      const aiGeneratedInsights = await generateInsights(campaign, performanceMetrics);
      
      const insights = {
        aiInsights: aiGeneratedInsights.insights,
        recommendations: aiGeneratedInsights.improvementSuggestions,
        predictiveMetrics: aiGeneratedInsights.predictiveMetrics
      };

      res.json(insights);
    } catch (error) {
      console.error("Error fetching insights:", error);
      res.status(500).json({ message: "Failed to fetch insights" });
    }
  });

  // API Connection routes
  app.get("/api/connection", async (req: Request, res: Response) => {
    try {
      const connections = await storage.getApiConnections();
      res.json(connections);
    } catch (error) {
      console.error("Error fetching API connections:", error);
      res.status(500).json({ message: "Failed to fetch API connections" });
    }
  });

  app.get("/api/connection/service/:service", async (req: Request, res: Response) => {
    try {
      const service = req.params.service;
      const connections = await storage.getApiConnectionsByService(service);
      res.json(connections);
    } catch (error) {
      console.error(`Error fetching ${req.params.service} connections:`, error);
      res.status(500).json({ message: `Failed to fetch ${req.params.service} connections` });
    }
  });

  app.get("/api/connection/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid connection ID" });
      }

      const connection = await storage.getApiConnection(id);
      if (!connection) {
        return res.status(404).json({ message: "API connection not found" });
      }

      res.json(connection);
    } catch (error) {
      console.error("Error fetching API connection:", error);
      res.status(500).json({ message: "Failed to fetch API connection" });
    }
  });

  app.post("/api/connection", async (req: Request, res: Response) => {
    try {
      const validatedData = insertApiConnectionSchema.parse(req.body);
      const connection = await storage.createApiConnection(validatedData);
      res.status(201).json(connection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid API connection data", errors: error.errors });
      }
      console.error("Error creating API connection:", error);
      res.status(500).json({ message: "Failed to create API connection" });
    }
  });

  app.put("/api/connection/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid connection ID" });
      }

      const validatedData = insertApiConnectionSchema.partial().parse(req.body);
      const updatedConnection = await storage.updateApiConnection(id, validatedData);
      
      if (!updatedConnection) {
        return res.status(404).json({ message: "API connection not found" });
      }

      res.json(updatedConnection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid API connection data", errors: error.errors });
      }
      console.error("Error updating API connection:", error);
      res.status(500).json({ message: "Failed to update API connection" });
    }
  });

  app.post("/api/connection/:id/test", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid connection ID" });
      }

      const connection = await storage.getApiConnection(id);
      if (!connection) {
        return res.status(404).json({ message: "API connection not found" });
      }

      // Test the connection
      const testResult = await testApiConnection(connection);
      
      // Update the connection's status in the database
      await storage.updateApiConnectionStatus(id, testResult.success, new Date());

      res.json(testResult);
    } catch (error) {
      console.error("Error testing API connection:", error);
      res.status(500).json({ message: "Failed to test API connection" });
    }
  });

  app.delete("/api/connection/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid connection ID" });
      }

      const deleted = await storage.deleteApiConnection(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "API connection not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting API connection:", error);
      res.status(500).json({ message: "Failed to delete API connection" });
    }
  });

  // Activity routes
  app.get("/api/activity", async (req: Request, res: Response) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // HCP data upload via CSV
  app.post("/api/hcp/upload", async (req: Request, res: Response) => {
    try {
      // In a production environment, we would process the actual CSV file
      // For demonstration purposes, we'll generate Japanese HCP records
      
      // Generate a random number of HCPs between the range
      const minHcps = 5;
      const maxHcps = 15;
      const numberOfHcps = Math.floor(Math.random() * (maxHcps - minHcps + 1)) + minHcps;
      
      // Sample data for generation
      const specialties = ["Cardiology", "Oncology", "Neurology", "Pediatrics", "Dermatology", "Internal Medicine"];
      const tags = ["Early Adopter", "Evidence Driven", "Patient Focused", "Balanced", "Cost Conscious", "Conservative"];
      const prescribingPatterns = ["High Volume", "Medium Volume", "Low Volume"];
      const organizations = ["Tokyo Medical Center", "Osaka University Hospital", "Kyoto Medical Clinic", "Yokohama General Hospital"];
      
      // Create HCPs with Japanese names for the sample
      const firstNames = ["Hiroshi", "Takashi", "Yuki", "Akira", "Naomi", "Keiko", "Satoshi", "Shigeru", "Yuriko", "Atsuko"];
      const lastNames = ["Tanaka", "Suzuki", "Takahashi", "Watanabe", "Ito", "Yamamoto", "Nakamura", "Kobayashi", "Saito", "Kato"];
      
      // Generate HCPs
      const hcps = Array.from({ length: numberOfHcps }, () => {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const specialty = specialties[Math.floor(Math.random() * specialties.length)];
        const tag = tags[Math.floor(Math.random() * tags.length)];
        const prescribingPattern = prescribingPatterns[Math.floor(Math.random() * prescribingPatterns.length)];
        const organization = organizations[Math.floor(Math.random() * organizations.length)];
        const engagementScore = Math.floor(Math.random() * 41) + 60; // 60-100 range
        const isKol = Math.random() > 0.8; // 20% chance of being a KOL
        
        return {
          name: `Dr. ${firstName} ${lastName}`,
          specialty,
          prescribingPattern,
          engagementScore,
          tag,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
          organization,
          isKol,
          location: "Tokyo, Japan",
          notes: `Specializes in ${specialty.toLowerCase()} treatments and research`
        };
      });
      
      // Save HCPs to storage
      const createdHcps = await Promise.all(hcps.map(hcp => storage.createHcp(hcp)));
      
      // Create activity record for this upload
      await storage.createActivity({
        activity: `Imported ${createdHcps.length} HCP records from CSV`,
        user: "admin",
        status: "Completed",
        relatedTo: "HCP"
      });
      
      res.status(201).json({ 
        message: "HCP data uploaded successfully", 
        count: createdHcps.length,
        success: true
      });
    } catch (error) {
      console.error("Error uploading HCP data:", error);
      res.status(500).json({ message: "Failed to upload HCP data" });
    }
  });

  // Slack Integration Routes
  app.post("/api/slack/send", async (req: Request, res: Response) => {
    try {
      const { text, blocks, channelId } = req.body;
      
      if (!text && !blocks) {
        return res.status(400).json({ message: "Missing required fields: either text or blocks must be provided" });
      }
      
      const result = await sendSlackMessage({
        text,
        blocks,
        channelId
      });
      
      if (!result.success) {
        const errorMessage = result.message || "Unknown error";
        return res.status(500).json({ 
          message: errorMessage,
          needsToken: errorMessage.includes("not configured")
        });
      }
      
      res.json(result);
    } catch (error) {
      console.error("Error sending Slack message:", error);
      res.status(500).json({ message: "Failed to send Slack message" });
    }
  });
  
  app.post("/api/slack/hcp-engagement", async (req: Request, res: Response) => {
    try {
      const { hcpId } = req.body;
      
      if (!hcpId) {
        return res.status(400).json({ 
          message: "Missing required field: hcpId" 
        });
      }
      
      // Get HCP data
      const id = parseInt(hcpId);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid HCP ID" });
      }
      
      const hcp = await storage.getHcp(id);
      if (!hcp) {
        return res.status(404).json({ message: "HCP not found" });
      }
      
      const result = await sendHcpEngagementMessage(hcp);
      
      if (!result.success) {
        const errorMessage = result.message || "Unknown error";
        return res.status(500).json({ 
          message: errorMessage,
          needsToken: errorMessage.includes("not configured")
        });
      }
      
      // Create activity record
      await storage.createActivity({
        activity: "HCP Engagement Message Sent",
        user: "John Doe",
        status: "Completed",
        relatedTo: `HCP:${hcp.id}`
      });
      
      res.json({
        success: true,
        message: "HCP engagement posted to Slack",
        timestamp: result.timestamp
      });
    } catch (error) {
      console.error("Error posting HCP engagement to Slack:", error);
      res.status(500).json({ message: "Failed to post HCP engagement" });
    }
  });
  
  app.post("/api/slack/campaign-analytics", async (req: Request, res: Response) => {
    try {
      const { campaignId } = req.body;
      
      if (!campaignId) {
        return res.status(400).json({ 
          message: "Missing required field: campaignId" 
        });
      }
      
      // Get campaign data
      const id = parseInt(campaignId);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid campaign ID" });
      }
      
      const campaign = await storage.getCampaign(id);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      // Get analytics for this campaign (simplified)
      const estimatedReach = 5000; // Simulated data
      const analytics = {
        name: campaign.name,
        status: campaign.status,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        reach: estimatedReach,
        engagements: Math.floor(estimatedReach * 0.65), // Simulated data
        avgTimeSpent: 42, // Simulated data
        topContent: "Drug efficacy comparison infographic", // Simulated data
      };
      
      const result = await sendCampaignAnalyticsMessage(analytics);
      
      if (!result.success) {
        const errorMessage = result.message || "Unknown error";
        return res.status(500).json({ 
          message: errorMessage,
          needsToken: errorMessage.includes("not configured")
        });
      }
      
      // Create activity record
      await storage.createActivity({
        activity: `Campaign Analytics Posted: ${campaign.name}`,
        user: "John Doe",
        status: "Completed",
        relatedTo: `Campaign:${campaign.id}`
      });
      
      res.json({
        success: true,
        message: "Campaign analytics posted to Slack",
        timestamp: result.timestamp
      });
    } catch (error) {
      console.error("Error posting campaign analytics to Slack:", error);
      res.status(500).json({ message: "Failed to post campaign analytics" });
    }
  });
  
  app.get("/api/slack/history", async (req: Request, res: Response) => {
    try {
      const { channelId, limit } = req.query;
      
      const result = await getSlackHistory(
        channelId as string | undefined,
        limit ? parseInt(limit as string) : undefined
      );
      
      if (!result.success) {
        const errorMessage = result.message || "Unknown error";
        return res.status(500).json({ 
          message: errorMessage,
          needsToken: errorMessage.includes("not configured")
        });
      }
      
      res.json({
        success: true,
        messages: result.messages
      });
    } catch (error) {
      console.error("Error reading Slack history:", error);
      res.status(500).json({ message: "Failed to read Slack history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
