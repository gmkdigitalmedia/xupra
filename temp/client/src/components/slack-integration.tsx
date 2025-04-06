import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { 
  sendSlackMessage, 
  postHcpEngagementToSlack, 
  postCampaignAnalyticsToSlack, 
  getSlackHistory 
} from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Slack message form schema
const messageFormSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  channelId: z.string().min(1, 'Channel ID is required')
});

// HCP engagement form schema
const hcpEngagementFormSchema = z.object({
  hcpId: z.string().min(1, 'HCP ID is required'),
  action: z.string().min(1, 'Action is required'),
  details: z.string().min(1, 'Details are required'),
  channelId: z.string().min(1, 'Channel ID is required')
});

// Campaign analytics form schema
const campaignAnalyticsFormSchema = z.object({
  campaignId: z.string().min(1, 'Campaign ID is required'),
  reach: z.number().min(0, 'Reach must be a positive number'),
  engagement: z.number().min(0, 'Engagement must be a positive number'),
  conversionRate: z.number().min(0, 'Conversion rate must be a positive number').max(100, 'Conversion rate cannot exceed 100%'),
  roi: z.number().min(0, 'ROI must be a positive number'),
  channelId: z.string().min(1, 'Channel ID is required')
});

type MessageFormValues = z.infer<typeof messageFormSchema>;
type HcpEngagementFormValues = z.infer<typeof hcpEngagementFormSchema>;
type CampaignAnalyticsFormValues = z.infer<typeof campaignAnalyticsFormSchema>;

export function SlackIntegration() {
  const [activeTab, setActiveTab] = useState('message');
  const [channelId, setChannelId] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [isSlackConfigured, setIsSlackConfigured] = useState<boolean | null>(null);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  // Message form
  const messageForm = useForm<MessageFormValues>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: '',
      channelId: ''
    }
  });

  // HCP Engagement form
  const hcpEngagementForm = useForm<HcpEngagementFormValues>({
    resolver: zodResolver(hcpEngagementFormSchema),
    defaultValues: {
      hcpId: '',
      action: '',
      details: '',
      channelId: ''
    }
  });

  // Campaign Analytics form
  const campaignAnalyticsForm = useForm<CampaignAnalyticsFormValues>({
    resolver: zodResolver(campaignAnalyticsFormSchema),
    defaultValues: {
      campaignId: '',
      reach: 0,
      engagement: 0,
      conversionRate: 0,
      roi: 0,
      channelId: ''
    }
  });

  // Update channel ID across all forms when it changes
  const handleChannelIdChange = (newChannelId: string) => {
    setChannelId(newChannelId);
    messageForm.setValue('channelId', newChannelId);
    hcpEngagementForm.setValue('channelId', newChannelId);
    campaignAnalyticsForm.setValue('channelId', newChannelId);
  };

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: sendSlackMessage,
    onSuccess: () => {
      toast({
        title: 'Message Sent',
        description: 'Your message was successfully sent to Slack',
      });
      messageForm.reset({
        message: '',
        channelId: channelId
      });
      // Refetch history if it's being displayed
      if (showHistory) {
        historyQuery.refetch();
      }
    },
    onError: (error) => {
      const errorMsg = error.message.includes('Slack bot token not configured') 
        ? 'Slack bot token not configured. Please set up your SLACK_BOT_TOKEN in the environment variables.'
        : `Failed to send message: ${error.message}`;
        
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
    }
  });

  // Post HCP engagement mutation
  const postHcpEngagementMutation = useMutation({
    mutationFn: postHcpEngagementToSlack,
    onSuccess: () => {
      toast({
        title: 'Engagement Posted',
        description: 'HCP engagement was successfully posted to Slack',
      });
      hcpEngagementForm.reset({
        hcpId: '',
        action: '',
        details: '',
        channelId: channelId
      });
      // Refetch history if it's being displayed
      if (showHistory) {
        historyQuery.refetch();
      }
    },
    onError: (error) => {
      const errorMsg = error.message.includes('Slack bot token not configured') 
        ? 'Slack bot token not configured. Please set up your SLACK_BOT_TOKEN in the environment variables.'
        : `Failed to post engagement: ${error.message}`;
        
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
    }
  });

  // Post campaign analytics mutation
  const postCampaignAnalyticsMutation = useMutation({
    mutationFn: postCampaignAnalyticsToSlack,
    onSuccess: () => {
      toast({
        title: 'Analytics Posted',
        description: 'Campaign analytics were successfully posted to Slack',
      });
      campaignAnalyticsForm.reset({
        campaignId: '',
        reach: 0,
        engagement: 0,
        conversionRate: 0,
        roi: 0,
        channelId: channelId
      });
      // Refetch history if it's being displayed
      if (showHistory) {
        historyQuery.refetch();
      }
    },
    onError: (error) => {
      const errorMsg = error.message.includes('Slack bot token not configured') 
        ? 'Slack bot token not configured. Please set up your SLACK_BOT_TOKEN in the environment variables.'
        : `Failed to post analytics: ${error.message}`;
        
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
    }
  });

  // Check if Slack is configured
  useEffect(() => {
    // Send a test message to check if Slack is configured
    if (channelId) {
      getSlackHistory(channelId, 1)
        .then(() => {
          setIsSlackConfigured(true);
        })
        .catch((error) => {
          // Check if the error is because Slack is not configured
          if (error.message && error.message.includes('Slack bot token not configured')) {
            setIsSlackConfigured(false);
          }
        });
    }
  }, [channelId]);

  // Fetch Slack history
  const historyQuery = useQuery({
    queryKey: ['slackHistory', channelId],
    queryFn: () => getSlackHistory(channelId, 10),
    enabled: showHistory && !!channelId,
  });

  // Handle message submission
  const onMessageSubmit = (values: MessageFormValues) => {
    sendMessageMutation.mutate({
      message: values.message,
      channelId: values.channelId
    });
  };

  // Handle HCP engagement submission
  const onHcpEngagementSubmit = (values: HcpEngagementFormValues) => {
    postHcpEngagementMutation.mutate({
      hcpId: values.hcpId,
      action: values.action,
      details: values.details,
      channelId: values.channelId
    });
  };

  // Handle campaign analytics submission
  const onCampaignAnalyticsSubmit = (values: CampaignAnalyticsFormValues) => {
    postCampaignAnalyticsMutation.mutate({
      campaignId: values.campaignId,
      metrics: {
        reach: values.reach,
        engagement: values.engagement,
        conversionRate: values.conversionRate,
        roi: values.roi
      },
      channelId: values.channelId
    });
  };

  return (
    <div className="space-y-6">
      {isSlackConfigured === false && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Slack Not Configured</AlertTitle>
          <AlertDescription>
            Slack integration has not been configured yet. Go to the API Connections page to set up 
            your Slack integration with a valid Bot Token.
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => setLocation('/admin')}
              >
                Go to API Connections
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Enter Slack Channel ID"
          value={channelId}
          onChange={(e) => handleChannelIdChange(e.target.value)}
          className="max-w-md"
        />
        <Button
          variant="outline"
          onClick={() => {
            if (channelId) {
              setShowHistory(!showHistory);
              if (!showHistory) {
                historyQuery.refetch();
              }
            } else {
              toast({
                title: 'Channel ID Required',
                description: 'Please enter a Slack channel ID to view message history',
                variant: 'destructive',
              });
            }
          }}
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </Button>
      </div>

      <Tabs
        defaultValue="message"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="message">Basic Message</TabsTrigger>
          <TabsTrigger value="hcp">HCP Engagement</TabsTrigger>
          <TabsTrigger value="analytics">Campaign Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="message">
          <Card>
            <CardHeader>
              <CardTitle>Send Slack Message</CardTitle>
              <CardDescription>
                Send a text message to a Slack channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...messageForm}>
                <form 
                  onSubmit={messageForm.handleSubmit(onMessageSubmit)} 
                  className="space-y-4"
                >
                  <FormField
                    control={messageForm.control}
                    name="channelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Channel ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter Channel ID" 
                            {...field} 
                            value={channelId || field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              handleChannelIdChange(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Find this in Slack by right-clicking on a channel and selecting "Copy Link"
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={messageForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your message" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={sendMessageMutation.isPending}
                  >
                    {sendMessageMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hcp">
          <Card>
            <CardHeader>
              <CardTitle>Post HCP Engagement</CardTitle>
              <CardDescription>
                Share Healthcare Professional engagement updates with your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...hcpEngagementForm}>
                <form 
                  onSubmit={hcpEngagementForm.handleSubmit(onHcpEngagementSubmit)} 
                  className="space-y-4"
                >
                  <FormField
                    control={hcpEngagementForm.control}
                    name="channelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Channel ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter Channel ID" 
                            {...field} 
                            value={channelId || field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              handleChannelIdChange(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={hcpEngagementForm.control}
                      name="hcpId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HCP ID</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter HCP ID" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={hcpEngagementForm.control}
                      name="action"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Action</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Email, Meeting, Content Share" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={hcpEngagementForm.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the engagement details" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={postHcpEngagementMutation.isPending}
                  >
                    {postHcpEngagementMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : "Post Engagement"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Share Campaign Analytics</CardTitle>
              <CardDescription>
                Post campaign performance metrics to your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...campaignAnalyticsForm}>
                <form 
                  onSubmit={campaignAnalyticsForm.handleSubmit(onCampaignAnalyticsSubmit)} 
                  className="space-y-4"
                >
                  <FormField
                    control={campaignAnalyticsForm.control}
                    name="channelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Channel ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter Channel ID" 
                            {...field} 
                            value={channelId || field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              handleChannelIdChange(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={campaignAnalyticsForm.control}
                    name="campaignId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter Campaign ID" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={campaignAnalyticsForm.control}
                      name="reach"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reach</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Number of people reached" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={campaignAnalyticsForm.control}
                      name="engagement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Engagement</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Number of interactions" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={campaignAnalyticsForm.control}
                      name="conversionRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Conversion Rate (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Conversion rate percentage" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={campaignAnalyticsForm.control}
                      name="roi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ROI</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Return on investment" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={postCampaignAnalyticsMutation.isPending}
                  >
                    {postCampaignAnalyticsMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : "Share Analytics"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Message History */}
      {showHistory && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Message History</CardTitle>
            <CardDescription>
              Recent messages from this channel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {historyQuery.isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : historyQuery.isError ? (
              <div className="p-4 text-center text-red-500">
                Error loading message history. {
                  historyQuery.error instanceof Error && 
                  historyQuery.error.message.includes('Slack bot token not configured') ?
                  'Slack bot token not configured. Please set up your SLACK_BOT_TOKEN.' :
                  'Please try again later.'
                }
              </div>
            ) : !historyQuery.data?.messages?.length ? (
              <div className="p-4 text-center text-gray-500">
                No messages found in this channel.
              </div>
            ) : (
              <div className="space-y-4">
                {historyQuery.data.messages.map((message: any, index: number) => (
                  <div 
                    key={index} 
                    className="border rounded-md p-3 bg-gray-50"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{message.user || 'Bot'}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(message.ts * 1000).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{message.text}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              onClick={() => historyQuery.refetch()}
              disabled={historyQuery.isLoading}
            >
              {historyQuery.isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : "Refresh History"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}