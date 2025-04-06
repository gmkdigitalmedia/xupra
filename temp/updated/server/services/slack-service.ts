import { WebClient, ChatPostMessageArguments } from '@slack/web-api';
import { log } from '../vite';

/**
 * Creates a Slack client with the given token
 * @param token Slack bot token
 */
export function createSlackClient(token: string): WebClient {
  return new WebClient(token);
}

/**
 * Sends a message to a Slack channel
 * @param client Slack WebClient
 * @param channelId Channel ID to send message to
 * @param message Message text or blocks to send
 * @returns Promise resolving to the message timestamp
 */
export async function sendSlackMessage(
  client: WebClient,
  channelId: string,
  message: string | any[]
): Promise<string | undefined> {
  try {
    let messageArgs: ChatPostMessageArguments;

    if (typeof message === 'string') {
      messageArgs = {
        channel: channelId,
        text: message
      };
    } else {
      messageArgs = {
        channel: channelId,
        blocks: message
      };
    }

    const response = await client.chat.postMessage(messageArgs);
    log(`Message sent to Slack channel ${channelId}`, 'slack');
    return response.ts;
  } catch (error) {
    log(`Error sending message to Slack: ${error}`, 'slack');
    throw error;
  }
}

/**
 * Reads the history of a Slack channel
 * @param client Slack WebClient
 * @param channelId Channel ID to read message history from
 * @param limit Maximum number of messages to retrieve
 * @returns Promise resolving to the conversation history
 */
export async function readSlackHistory(
  client: WebClient,
  channelId: string,
  limit: number = 10
): Promise<any> {
  try {
    const response = await client.conversations.history({
      channel: channelId,
      limit
    });
    return response;
  } catch (error) {
    log(`Error reading Slack channel history: ${error}`, 'slack');
    throw error;
  }
}

/**
 * Posts an HCP engagement update to Slack
 * @param client Slack WebClient
 * @param channelId Channel ID to send message to
 * @param hcpName Name of the healthcare professional
 * @param action Type of engagement (email, meeting, content share)
 * @param details Additional engagement details
 * @returns Promise resolving to the message timestamp
 */
export async function postHcpEngagementUpdate(
  client: WebClient,
  channelId: string,
  hcpName: string,
  action: string,
  details: string
): Promise<string | undefined> {
  try {
    const message: ChatPostMessageArguments = {
      channel: channelId,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🩺 HCP Engagement Update',
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Healthcare Professional:*\n${hcpName}`
            },
            {
              type: 'mrkdwn',
              text: `*Action:*\n${action}`
            }
          ]
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Details:*\n${details}`
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Posted via Xupra HCP Platform • ${new Date().toLocaleString()}`
            }
          ]
        }
      ]
    };

    const response = await client.chat.postMessage(message);
    log(`HCP engagement update sent to Slack channel ${channelId}`, 'slack');
    return response.ts;
  } catch (error) {
    log(`Error sending HCP engagement update to Slack: ${error}`, 'slack');
    throw error;
  }
}

/**
 * Posts a campaign analytics update to Slack
 * @param client Slack WebClient
 * @param channelId Channel ID to send message to
 * @param campaignName Name of the campaign
 * @param metrics Campaign performance metrics
 * @returns Promise resolving to the message timestamp
 */
export async function postCampaignAnalytics(
  client: WebClient,
  channelId: string,
  campaignName: string,
  metrics: {
    reach: number;
    engagement: number;
    conversionRate: number;
    roi: number;
  }
): Promise<string | undefined> {
  try {
    const message: ChatPostMessageArguments = {
      channel: channelId,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📊 Campaign Analytics Update',
            emoji: true
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Campaign:* ${campaignName}`
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Reach:*\n${metrics.reach.toLocaleString()} HCPs`
            },
            {
              type: 'mrkdwn',
              text: `*Engagement:*\n${metrics.engagement.toLocaleString()} interactions`
            },
            {
              type: 'mrkdwn',
              text: `*Conversion Rate:*\n${metrics.conversionRate.toFixed(2)}%`
            },
            {
              type: 'mrkdwn',
              text: `*ROI:*\n${metrics.roi.toFixed(2)}x`
            }
          ]
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Posted via Xupra HCP Platform • ${new Date().toLocaleString()}`
            }
          ]
        }
      ]
    };

    const response = await client.chat.postMessage(message);
    log(`Campaign analytics update sent to Slack channel ${channelId}`, 'slack');
    return response.ts;
  } catch (error) {
    log(`Error sending campaign analytics update to Slack: ${error}`, 'slack');
    throw error;
  }
}