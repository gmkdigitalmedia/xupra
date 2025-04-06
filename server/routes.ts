import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertHcpSchema, 
  insertContentSchema, 
  insertCampaignSchema, 
  insertAssetSchema, 
  insertActivitySchema 
} from "@shared/schema";
import { z } from "zod";
import { 
  generatePersonalizedContent, 
  analyzeMedicalCompliance, 
  generateCampaignPlan, 
  generateInsights,
  tagHcpWithMediTag 
} from "./services/openai-service";

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

  app.post("/api/content/generate", async (req: Request, res: Response) => {
    try {
      const { hcpId, contentType, productInfo, keyMessage } = req.body;
      
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
      
      // Generate personalized content using OpenAI
      const productDescription = `${productInfo} ${keyMessage || ""}`.trim();
      const content = await generatePersonalizedContent(
        {
          name: hcp.name || "",
          specialty: hcp.specialty || "",
          prescribingPattern: hcp.prescribingPattern || "",
          engagementScore: hcp.engagementScore || 50,
          tag: hcp.tag || ""
        },
        contentType,
        productDescription
      );
      
      // Analyze compliance
      const complianceResult = await analyzeMedicalCompliance(content);
      
      const generatedContent = {
        subject: `${productInfo} Information for ${hcp.name}`,
        content,
        compliance: {
          medical: { 
            status: complianceResult.isCompliant ? "approved" : "warning", 
            notes: complianceResult.isCompliant ? "All claims supported by clinical data" : complianceResult.issues.join("; ")
          },
          legal: { 
            status: complianceResult.isCompliant ? "approved" : "review", 
            notes: "Legal review recommended" 
          },
          regulatory: { 
            status: "warning", 
            notes: complianceResult.suggestions.join("; ") || "Include full safety information in final version" 
          }
        },
        hcp: hcp.name
      };

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
      // In a real implementation, CSV parsing would happen here
      // For now, we'll just create some mock HCP records

      // Create sample HCPs based on the mock data needed
      const hcps = [
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

      // Create HCPs in storage
      const createdHcps = await Promise.all(hcps.map(hcp => storage.createHcp(hcp)));

      // Create activity record for this upload
      await storage.createActivity({
        activity: "CSV HCP data imported",
        user: "John Doe",
        status: "Completed",
        relatedTo: "HCP"
      });

      res.status(201).json({ message: "HCP data uploaded successfully", count: createdHcps.length });
    } catch (error) {
      console.error("Error uploading HCP data:", error);
      res.status(500).json({ message: "Failed to upload HCP data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
