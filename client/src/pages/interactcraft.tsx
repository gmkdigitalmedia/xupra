import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardHeader from '../components/dashboard-header';
import { useIsMobile } from '../hooks/use-is-mobile';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import AdvisoryBoardsTab from '../components/interactcraft/advisory-boards-tab';
import DiscussionForumsTab from '../components/interactcraft/discussion-forums-tab';
import DelphiSurveysTab from '../components/interactcraft/delphi-surveys-tab';

export default function InteractCraft() {
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState("advisory-boards");

  // Simulated active sessions
  const activeSessions = {
    advisoryBoards: 3,
    discussionForums: 7,
    delphiSurveys: 2
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-8">
      <DashboardHeader 
        title="InteractCraft AI" 
        description="AI-powered engagement suite for healthcare professionals"
        showBackButton 
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Left sidebar with overview */}
        <Card className="col-span-1 md:sticky md:top-20 h-fit max-h-[calc(100vh-180px)]">
          <CardHeader>
            <CardTitle>Engagement Hub</CardTitle>
            <CardDescription>Manage your expert engagements</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Active Sessions</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Advisory Boards</span>
                      <Badge variant="outline">{activeSessions.advisoryBoards}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Discussion Forums</span>
                      <Badge variant="outline">{activeSessions.discussionForums}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delphi Surveys</span>
                      <Badge variant="outline">{activeSessions.delphiSurveys}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recent Activity</h3>
                  <div className="text-xs space-y-2">
                    <div className="border-l-2 border-blue-500 pl-2">
                      <p className="font-medium">Diabetes Treatment Advisory Board</p>
                      <p className="text-muted-foreground">2 new responses • 15m ago</p>
                    </div>
                    <div className="border-l-2 border-green-500 pl-2">
                      <p className="font-medium">Oncology Discussion Forum</p>
                      <p className="text-muted-foreground">New topic added • 1h ago</p>
                    </div>
                    <div className="border-l-2 border-purple-500 pl-2">
                      <p className="font-medium">Cardiology Treatment Survey</p>
                      <p className="text-muted-foreground">Round 2 started • 3h ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">AI Insights</h3>
                  <div className="bg-primary/10 p-3 rounded-md text-xs">
                    <p className="font-medium text-primary">Key Opinion Pattern</p>
                    <p className="mt-1">83% of KOLs favor patient-centered approaches in recent discussions.</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <span className="material-icons mr-2 text-sm">notifications</span>
              Manage Notifications
            </Button>
          </CardFooter>
        </Card>

        {/* Main content with tabs */}
        <div className="col-span-1 md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Engagement Methods</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <span className="material-icons mr-1 text-sm">filter_list</span>
                    Filter
                  </Button>
                  <Button size="sm">
                    <span className="material-icons mr-1 text-sm">add</span>
                    New
                  </Button>
                </div>
              </div>
              <CardDescription>Choose a method to connect with healthcare professionals</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Tabs defaultValue="advisory-boards" value={selectedTab} onValueChange={setSelectedTab}>
                <div className="border-b">
                  <TabsList className="bg-transparent h-auto p-0 border-b-0 mb-0">
                    <TabsTrigger 
                      value="advisory-boards" 
                      className={`rounded-none py-2 px-4 border-b-2 ${selectedTab === 'advisory-boards' ? 'border-primary' : 'border-transparent'}`}
                    >
                      <span className="material-icons mr-2 text-sm">groups</span>
                      Advisory Boards
                    </TabsTrigger>
                    <TabsTrigger 
                      value="discussion-forums" 
                      className={`rounded-none py-2 px-4 border-b-2 ${selectedTab === 'discussion-forums' ? 'border-primary' : 'border-transparent'}`}
                    >
                      <span className="material-icons mr-2 text-sm">forum</span>
                      Discussion Forums
                    </TabsTrigger>
                    <TabsTrigger 
                      value="delphi-surveys" 
                      className={`rounded-none py-2 px-4 border-b-2 ${selectedTab === 'delphi-surveys' ? 'border-primary' : 'border-transparent'}`}
                    >
                      <span className="material-icons mr-2 text-sm">poll</span>
                      Delphi Surveys
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="mt-4">
                  <TabsContent value="advisory-boards">
                    <AdvisoryBoardsTab />
                  </TabsContent>
                  
                  <TabsContent value="discussion-forums">
                    <DiscussionForumsTab />
                  </TabsContent>
                  
                  <TabsContent value="delphi-surveys">
                    <DelphiSurveysTab />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* AI Assistance and Analytics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Get help with your engagements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-full items-center justify-center p-6 border-2 border-dashed border-primary/20 rounded-lg">
                  <div className="text-center">
                    <span className="material-icons text-primary text-4xl mb-2">psychology</span>
                    <h3 className="font-medium mb-1">What would you like to do?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your AI assistant can help generate engagement content,
                      summarize discussions, and analyze feedback.
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <span className="material-icons mr-2 text-sm">description</span>
                        Generate agenda topics
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <span className="material-icons mr-2 text-sm">summarize</span>
                        Summarize discussions
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <span className="material-icons mr-2 text-sm">insights</span>
                        Analyze sentiment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Analytics</CardTitle>
                <CardDescription>Monitor participation and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Participation Rates</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Advisory Boards</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full h-2 bg-background-lighter rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Discussion Forums</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full h-2 bg-background-lighter rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Delphi Surveys</span>
                          <span>65%</span>
                        </div>
                        <div className="w-full h-2 bg-background-lighter rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Trending Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Patient Outcomes</Badge>
                      <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Rare Diseases</Badge>
                      <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">Treatment Protocols</Badge>
                      <Badge className="bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30">Clinical Trials</Badge>
                      <Badge className="bg-rose-500/20 text-rose-400 hover:bg-rose-500/30">Digital Health</Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <span className="material-icons mr-2 text-sm">analytics</span>
                    View Detailed Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}