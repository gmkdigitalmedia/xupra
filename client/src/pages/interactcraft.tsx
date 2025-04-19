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

// Create a custom event to facilitate communication between components
const createInteractCraftEvent = (name: string, detail: any) => {
  const event = new CustomEvent(name, { detail });
  document.dispatchEvent(event);
};

export default function InteractCraft() {
  const [activeTab, setActiveTab] = useState("advisoryBoards");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newItemType, setNewItemType] = useState<'board' | 'forum' | 'survey'>('board');
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    participants: '',
    type: 'clinical',
  });

  // Sample data for the sidebar
  const [activeSessions, setActiveSessions] = useState({
    advisoryBoards: 3,
    discussionForums: 5,
    delphiSurveys: 2
  });

  const [upcomingSessions, setUpcomingSessions] = useState({
    advisoryBoards: 2,
    discussionForums: 1,
    delphiSurveys: 3
  });

  // Set up event listeners for communication between tabs
  useEffect(() => {
    const handleCreateItem = (e: any) => {
      const { itemType } = e.detail;
      setNewItemType(itemType);
      setIsCreateDialogOpen(true);
    };

    document.addEventListener('interactcraft:create-item', handleCreateItem as EventListener);

    return () => {
      document.removeEventListener('interactcraft:create-item', handleCreateItem as EventListener);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value }));
  };

  const getItemTypeName = (type: 'board' | 'forum' | 'survey') => {
    switch(type) {
      case 'board': return 'Advisory Board';
      case 'forum': return 'Discussion Forum';
      case 'survey': return 'Delphi Survey';
    }
  };

  const handleCreateItem = () => {
    // Basic validation
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Please enter a title for your " + getItemTypeName(newItemType).toLowerCase(),
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
      if (newItemType === 'board') setActiveTab('advisoryBoards');
      if (newItemType === 'forum') setActiveTab('discussionForums');
      if (newItemType === 'survey') setActiveTab('delphiSurveys');

      // Emit event to notify tabs of the new item
      createInteractCraftEvent('interactcraft:item-created', { 
        itemType: newItemType,
        item: { ...formData }
      });

      // Reset form data
      setFormData({
        title: '',
        description: '',
        date: '',
        participants: '',
        type: 'clinical',
      });
    }, 1500);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar />
      {/* Main content area with proper margin on medium screens and up */}
      <div className="flex-1 overflow-y-auto bg-background-dark md:ml-64">
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
                      <h3 className="text-sm font-medium">Upcoming Sessions</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Advisory Boards</span>
                          <Badge variant="outline">{upcomingSessions.advisoryBoards}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Discussion Forums</span>
                          <Badge variant="outline">{upcomingSessions.discussionForums}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Delphi Surveys</span>
                          <Badge variant="outline">{upcomingSessions.delphiSurveys}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={() => setIsCreateDialogOpen(true)}
                      >
                        <span className="material-icons mr-2 text-sm">add</span>
                        New Engagement
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            {/* Main content area with tabs */}
            <div className="col-span-1 md:col-span-3">
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="advisoryBoards">Advisory Boards</TabsTrigger>
                  <TabsTrigger value="discussionForums">Discussion Forums</TabsTrigger>
                  <TabsTrigger value="delphiSurveys">Delphi Surveys</TabsTrigger>
                </TabsList>
                
                <TabsContent value="advisoryBoards">
                  <Suspense fallback={<div>Loading Advisory Boards...</div>}>
                    <AdvisoryBoardsTab />
                  </Suspense>
                </TabsContent>
                
                <TabsContent value="discussionForums">
                  <Suspense fallback={<div>Loading Discussion Forums...</div>}>
                    <DiscussionForumsTab />
                  </Suspense>
                </TabsContent>
                
                <TabsContent value="delphiSurveys">
                  <Suspense fallback={<div>Loading Delphi Surveys...</div>}>
                    <DelphiSurveysTab />
                  </Suspense>
                </TabsContent>
              </Tabs>
              
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
                            Summarize discussion
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <span className="material-icons mr-2 text-sm">insights</span>
                            Analyze feedback
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Analytics</CardTitle>
                    <CardDescription>Track participation and sentiment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-full items-center justify-center p-6 border-2 border-dashed border-primary/20 rounded-lg">
                      <div className="text-center">
                        <span className="material-icons text-primary text-4xl mb-2">analytics</span>
                        <h3 className="font-medium mb-1">No analytics available yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Analytics will be available once you have active engagements
                          with participation data.
                        </p>
                        <Button variant="outline">
                          <span className="material-icons mr-2 text-sm">refresh</span>
                          Check again
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Create new item dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create new {getItemTypeName(newItemType)}</DialogTitle>
            <DialogDescription>
              Fill in the details to set up your {getItemTypeName(newItemType).toLowerCase()}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder={`Enter ${getItemTypeName(newItemType)} title`}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Brief description of the purpose and goals"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="participants" className="text-right">
                Participants
              </Label>
              <Input
                id="participants"
                name="participants"
                value={formData.participants}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Number of participants"
              />
            </div>
            
            {(newItemType === 'board' || newItemType === 'forum') && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select 
                  value={formData.type}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clinical">Clinical</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
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