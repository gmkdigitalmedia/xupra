import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generatePersonalizedContent(
  hcpData: {
    name: string;
    specialty: string;
    prescribingPattern: string;
    engagementScore: number;
    tag: string;
  },
  contentType: string,
  productInfo: string,
): Promise<string> {
  try {
    const prompt = `
    Generate personalized ${contentType} content for a healthcare professional with the following profile:
    - Name: ${hcpData.name}
    - Specialty: ${hcpData.specialty}
    - Prescribing Pattern: ${hcpData.prescribingPattern}
    - Engagement Score: ${hcpData.engagementScore}
    - Tag/Segment: ${hcpData.tag}
    
    The content should be about the following product:
    ${productInfo}
    
    Make the content professional, compliant with pharmaceutical regulations, and personalized based on the HCP's profile.
    Focus especially on aspects relevant to their specialty and prescribing pattern.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "Unable to generate content.";
  } catch (error) {
    console.error("Error generating content with OpenAI:", error);
    throw new Error("Failed to generate content. Please try again later.");
  }
}

export async function analyzeMedicalCompliance(
  content: string
): Promise<{
  isCompliant: boolean;
  issues: string[];
  suggestions: string[];
}> {
  try {
    const prompt = `
    Analyze the following pharmaceutical content for medical compliance issues:
    "${content}"
    
    Check for:
    1. Unsubstantiated claims
    2. Off-label promotion
    3. Missing risk information
    4. Regulatory violations
    5. Any other compliance concerns
    
    Respond with JSON in this exact format:
    {
      "isCompliant": boolean,
      "issues": [list of issues found, empty if none],
      "suggestions": [list of suggestions to fix issues, empty if none]
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      isCompliant: result.isCompliant ?? false,
      issues: result.issues ?? [],
      suggestions: result.suggestions ?? [],
    };
  } catch (error) {
    console.error("Error analyzing compliance with OpenAI:", error);
    throw new Error("Failed to analyze compliance. Please try again later.");
  }
}

export async function generateCampaignPlan(
  hcpData: {
    name: string;
    specialty: string;
    prescribingPattern: string;
    engagementScore: number;
    tag: string;
  },
  contentId: string,
  previousEngagements: string[]
): Promise<{
  recommendedChannels: string[];
  optimalTiming: string;
  frequencyRecommendation: string;
  rationale: string;
}> {
  try {
    const prompt = `
    Generate an optimized campaign plan for engaging with a healthcare professional based on the following profile:
    - Name: ${hcpData.name}
    - Specialty: ${hcpData.specialty}
    - Prescribing Pattern: ${hcpData.prescribingPattern}
    - Engagement Score: ${hcpData.engagementScore}
    - Tag/Segment: ${hcpData.tag}
    
    Content ID to be used: ${contentId}
    
    Previous engagements:
    ${previousEngagements.join('\n')}
    
    Respond with JSON in this exact format:
    {
      "recommendedChannels": [list of recommended channels in priority order],
      "optimalTiming": "description of best timing",
      "frequencyRecommendation": "recommendation for frequency",
      "rationale": "detailed explanation for recommendations"
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      recommendedChannels: result.recommendedChannels ?? [],
      optimalTiming: result.optimalTiming ?? "",
      frequencyRecommendation: result.frequencyRecommendation ?? "",
      rationale: result.rationale ?? "",
    };
  } catch (error) {
    console.error("Error generating campaign plan with OpenAI:", error);
    throw new Error("Failed to generate campaign plan. Please try again later.");
  }
}

export async function generateInsights(
  campaignData: any,
  performanceMetrics: any
): Promise<{
  insights: string[];
  improvementSuggestions: string[];
  predictiveMetrics: any;
}> {
  try {
    const prompt = `
    Analyze the following campaign data and performance metrics to generate insights:
    
    Campaign information:
    ${JSON.stringify(campaignData)}
    
    Performance metrics:
    ${JSON.stringify(performanceMetrics)}
    
    Respond with JSON in this exact format:
    {
      "insights": [list of key insights from the analysis],
      "improvementSuggestions": [list of actionable suggestions for improvement],
      "predictiveMetrics": {
        "projectedResponse": number,
        "estimatedRoi": number,
        "recommendedFollowup": string
      }
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      insights: result.insights ?? [],
      improvementSuggestions: result.improvementSuggestions ?? [],
      predictiveMetrics: result.predictiveMetrics ?? {},
    };
  } catch (error) {
    console.error("Error generating insights with OpenAI:", error);
    throw new Error("Failed to generate insights. Please try again later.");
  }
}

export async function tagHcpWithMediTag(
  hcpData: {
    name: string;
    specialty: string;
    prescribingPattern: string;
    organization: string;
    notes: string;
  }
): Promise<{
  tag: string;
  engagementScore: number;
  rationale: string;
}> {
  try {
    const prompt = `
    Analyze the following healthcare professional data and suggest a tag/segment and engagement score:
    
    HCP information:
    - Name: ${hcpData.name}
    - Specialty: ${hcpData.specialty}
    - Prescribing Pattern: ${hcpData.prescribingPattern}
    - Organization: ${hcpData.organization}
    - Notes: ${hcpData.notes}
    
    Possible tags: "High Value", "Growth Potential", "Maintenance", "Low Engagement", "New Prescriber", "Key Opinion Leader"
    
    Engagement scores should be between 1-100, where:
    - 80-100: Very high engagement potential
    - 60-79: High engagement potential
    - 40-59: Moderate engagement potential
    - 20-39: Low engagement potential
    - 1-19: Very low engagement potential
    
    Respond with JSON in this exact format:
    {
      "tag": "selected tag",
      "engagementScore": number,
      "rationale": "explanation for tag and score"
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      tag: result.tag ?? "Unclassified",
      engagementScore: result.engagementScore ?? 50,
      rationale: result.rationale ?? "",
    };
  } catch (error) {
    console.error("Error tagging HCP with OpenAI:", error);
    throw new Error("Failed to tag HCP. Please try again later.");
  }
}