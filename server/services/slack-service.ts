import { WebClient, ChatPostMessageArguments } from "@slack/web-api";

// Initialize the Slack client
const slackClient = process.env.SLACK_BOT_TOKEN 
  ? new WebClient(process.env.SLACK_BOT_TOKEN)
  : null;

const defaultChannelId = process.env.SLACK_CHANNEL_ID || "";

export interface SlackMessageOptions {
  channelId?: string;
  text?: string;
  blocks?: any[];
}

/**
 * Sends a message to Slack
 * @param options Message options including channel, text and blocks
 * @returns Promise with the message result or error details
 */
export async function sendSlackMessage(options: SlackMessageOptions): Promise<{ success: boolean; message: string; timestamp?: string }> {
  try {
    if (!slackClient) {
      return { 
        success: false, 
        message: "Slack integration not configured. Please add SLACK_BOT_TOKEN to your environment variables." 
      };
    }

    const channelId = options.channelId || defaultChannelId;
    
    if (!channelId) {
      return { 
        success: false, 
        message: "No Slack channel specified. Please add SLACK_CHANNEL_ID to your environment variables or specify a channel." 
      };
    }

    const messageOptions: ChatPostMessageArguments = {
      channel: channelId,
      text: options.text || "Message from Xupra",
      blocks: options.blocks,
    };

    const result = await slackClient.chat.postMessage(messageOptions);
    
    return {
      success: true,
      message: "Message sent successfully",
      timestamp: result.ts
    };
  } catch (error: any) {
    console.error("Error sending Slack message:", error);
    return {
      success: false,
      message: `Failed to send message: ${error.message || "Unknown error"}`
    };
  }
}

/**
 * Reads message history from a Slack channel
 * @param channelId The channel ID to read history from (defaults to environment value)
 * @param limit Maximum number of messages to retrieve
 * @returns Promise with the message history or error details
 */
export async function getSlackHistory(channelId?: string, limit: number = 100): Promise<{ 
  success: boolean; 
  messages?: any[]; 
  message?: string;
}> {
  try {
    if (!slackClient) {
      return { 
        success: false, 
        message: "Slack integration not configured. Please add SLACK_BOT_TOKEN to your environment variables." 
      };
    }

    const channel = channelId || defaultChannelId;
    
    if (!channel) {
      return { 
        success: false, 
        message: "No Slack channel specified. Please add SLACK_CHANNEL_ID to your environment variables or specify a channel." 
      };
    }

    const result = await slackClient.conversations.history({
      channel,
      limit,
    });
    
    return {
      success: true,
      messages: result.messages || []
    };
  } catch (error: any) {
    console.error("Error fetching Slack history:", error);
    return {
      success: false,
      message: `Failed to fetch message history: ${error.message || "Unknown error"}`
    };
  }
}

/**
 * Creates and sends a formatted HCP engagement message to Slack
 * @param hcpData HCP engagement data
 * @returns Promise with the message result
 */
export async function sendHcpEngagementMessage(hcpData: any): Promise<{ success: boolean; message: string; timestamp?: string }> {
  try {
    const blocks = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🏥 HCP Engagement Update",
          emoji: true
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Name:*\n${hcpData.name}`
          },
          {
            type: "mrkdwn",
            text: `*Specialty:*\n${hcpData.specialty}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Hospital:*\n${hcpData.hospital || "N/A"}`
          },
          {
            type: "mrkdwn",
            text: `*Location:*\n${hcpData.location}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Engagement Score:*\n${hcpData.engagementScore}/10`
          },
          {
            type: "mrkdwn",
            text: `*KOL Status:*\n${hcpData.isKol ? "Yes ⭐" : "No"}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Tag:*\n${hcpData.tag}`
          },
          {
            type: "mrkdwn",
            text: `*Prescribing Pattern:*\n${hcpData.prescribingPattern}`
          }
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `📊 Data from Xupra Platform | ${new Date().toLocaleDateString()}`
          }
        ]
      }
    ];

    return await sendSlackMessage({
      blocks,
      text: `HCP Engagement Update for ${hcpData.name}`
    });
  } catch (error: any) {
    console.error("Error creating HCP engagement message:", error);
    return {
      success: false,
      message: `Failed to create HCP engagement message: ${error.message || "Unknown error"}`
    };
  }
}

/**
 * Creates and sends a formatted campaign analytics message to Slack
 * @param campaignData Campaign analytics data
 * @returns Promise with the message result
 */
export async function sendCampaignAnalyticsMessage(campaignData: any): Promise<{ success: boolean; message: string; timestamp?: string }> {
  try {
    // Calculate engagement rate as a percentage
    const engagementRate = ((campaignData.engagements / campaignData.reach) * 100).toFixed(1);
    
    const blocks = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📣 Campaign Analytics Report",
          emoji: true
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Campaign:*\n${campaignData.name}`
          },
          {
            type: "mrkdwn",
            text: `*Status:*\n${campaignData.status}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Start Date:*\n${new Date(campaignData.startDate).toLocaleDateString()}`
          },
          {
            type: "mrkdwn",
            text: `*End Date:*\n${new Date(campaignData.endDate).toLocaleDateString()}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Reach:*\n${campaignData.reach.toLocaleString()} HCPs`
          },
          {
            type: "mrkdwn",
            text: `*Engagements:*\n${campaignData.engagements.toLocaleString()}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Engagement Rate:*\n${engagementRate}%`
          },
          {
            type: "mrkdwn",
            text: `*Avg. Time Spent:*\n${campaignData.avgTimeSpent}s`
          }
        ]
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Top Performing Content:*\n${campaignData.topContent}`
        }
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `📊 Analytics from Xupra Platform | ${new Date().toLocaleDateString()}`
          }
        ]
      }
    ];

    return await sendSlackMessage({
      blocks,
      text: `Campaign Analytics Report for ${campaignData.name}`
    });
  } catch (error: any) {
    console.error("Error creating campaign analytics message:", error);
    return {
      success: false,
      message: `Failed to create campaign analytics message: ${error.message || "Unknown error"}`
    };
  }
}