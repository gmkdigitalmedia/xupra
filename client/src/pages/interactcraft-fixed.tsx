import { useState, lazy, Suspense, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import DashboardHeader from '../components/dashboard-header';
import Sidebar from '@/components/sidebar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Lazy load the tab components to improve initial load time
const AdvisoryBoardsTab = lazy(() => import('@/components/interactcraft/advisory-boards-tab'));
const DiscussionForumsTab = lazy(() => import('@/components/interactcraft/discussion-forums-tab'));
const DelphiSurveysTab = lazy(() => import('@/components/interactcraft/delphi-surveys-tab'));

// Loading fallback for the tabs
const TabLoading = ({ title, description }: { title: string, description: string }) => (
  <div className="p-6 flex justify-center items-center h-64">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function InteractCraft() {
  const [selectedTab, setSelectedTab] = useState("advisory-boards");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newItemType, setNewItemType] = useState<string>("advisory-board");
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemFormat, setNewItemFormat] = useState("video");
  const [isCreating, setIsCreating] = useState(false);
  
  // Handle create new item dialog
  const handleOpenCreateDialog = (type: string) => {
    setNewItemType(type);
    setNewItemTitle("");
    setNewItemDescription("");
    setNewItemFormat("video");
    setIsCreateDialogOpen(true);
  };

  // Set up event listener for create-item events from tab components
  useEffect(() => {
    const handleCreateItemEvent = (event: CustomEvent) => {
      if (event.detail && event.detail.type) {
        handleOpenCreateDialog(event.detail.type);
      }
    };

    // Add event listener
    document.addEventListener('create-item', handleCreateItemEvent as EventListener);
    
    // Cleanup on unmount
    return () => {
      document.removeEventListener('create-item', handleCreateItemEvent as EventListener);
    };
  }, []);  // Empty dependency array - only run once on mount

  // Simulated active sessions
  const activeSessions = {
    advisoryBoards: 3,
    discussionForums: 7,
    delphiSurveys: 2
  };

  const handleCreateItem = () => {
    // Validate input
    if (!newItemTitle.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a title for your new item.",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Show success message
      toast({
        title: "Success!",
        description: `Your new ${getItemTypeName(newItemType)} has been created.`,
        variant: "default"
      });

      // Reset form and close dialog
      setIsCreating(false);
      setIsCreateDialogOpen(false);
      
      // Update the selected tab to match the created item type
      if (newItemType === "advisory-board") {
        setSelectedTab("advisory-boards");
      } else if (newItemType === "discussion-forum") {
        setSelectedTab("discussion-forums");
      } else if (newItemType === "delphi-survey") {
        setSelectedTab("delphi-surveys");
      }
    }, 1500);
  };

  const getItemTypeName = (type: string): string => {
    switch (type) {
      case "advisory-board": return "Advisory Board";
      case "discussion-forum": return "Discussion Forum";
      case "delphi-survey": return "Delphi Survey";
      default: return "Item";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="w-full p-4 md:p-8">
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
                      <Button 
                        size="sm"
                        onClick={() => {
                          // Set the type based on the currently selected tab
                          const type = selectedTab === "advisory-boards" 
                            ? "advisory-board" 
                            : selectedTab === "discussion-forums" 
                              ? "discussion-forum" 
                              : "delphi-survey";
                          handleOpenCreateDialog(type);
                        }}
                      >
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
                        <Suspense fallback={<TabLoading title="Advisory Boards" description="Structured live sessions with healthcare experts" />}>
                          <AdvisoryBoardsTab />
                        </Suspense>
                      </TabsContent>
                      
                      <TabsContent value="discussion-forums">
                        <Suspense fallback={<TabLoading title="Discussion Forums" description="Threaded conversations with flexible participation timing" />}>
                          <DiscussionForumsTab />
                        </Suspense>
                      </TabsContent>
                      
                      <TabsContent value="delphi-surveys">
                        <Suspense fallback={<TabLoading title="Delphi Surveys" description="Multi-round surveys with iterative feedback and consensus tracking" />}>
                          <DelphiSurveysTab />
                        </Suspense>
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
      </div>
      
      {/* Create New Item Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New {getItemTypeName(newItemType)}</DialogTitle>
            <DialogDescription>
              Create a new engagement opportunity with healthcare professionals.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="item-type">Engagement Type</Label>
              <Select 
                value={newItemType} 
                onValueChange={setNewItemType}
              >
                <SelectTrigger id="item-type">
                  <SelectValue placeholder="Select engagement type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="advisory-board">Advisory Board</SelectItem>
                  <SelectItem value="discussion-forum">Discussion Forum</SelectItem>
                  <SelectItem value="delphi-survey">Delphi Survey</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="item-title">Title</Label>
              <Input
                id="item-title"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                placeholder="Enter a descriptive title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="item-description">Description</Label>
              <Textarea
                id="item-description"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
                placeholder="Provide details about the purpose and goals"
                rows={3}
              />
            </div>
            
            {newItemType === "advisory-board" && (
              <div className="space-y-2">
                <Label htmlFor="item-format">Format</Label>
                <Select 
                  value={newItemFormat} 
                  onValueChange={setNewItemFormat}
                >
                  <SelectTrigger id="item-format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Conference</SelectItem>
                    <SelectItem value="audio">Audio Only</SelectItem>
                    <SelectItem value="text">Text-based</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateItem}
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <span className="material-icons animate-spin mr-2 text-sm">refresh</span>
                  Creating...
                </>
              ) : (
                <>
                  <span className="material-icons mr-2 text-sm">add</span>
                  Create {getItemTypeName(newItemType)}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}