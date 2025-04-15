import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Progress } from "@/components/ui/progress";

// Mock data for forums
const mockForums = [
  {
    id: 1,
    title: "Next-Generation Oncology Therapies",
    description: "Discussing recent advancements in targeted therapies for multiple tumor types",
    status: "active",
    topicCount: 7,
    messageCount: 42,
    lastActivity: "2 hours ago",
    participantCount: 18,
    recentParticipants: [
      { id: 1, name: "Dr. Tanaka", avatar: null, specialty: "Oncology" },
      { id: 2, name: "Dr. Chen", avatar: null, specialty: "Hematology" },
      { id: 3, name: "Dr. Smith", avatar: null, specialty: "Radiation Oncology" }
    ],
    topics: [
      { id: 1, title: "CAR-T Therapy Advancements", replies: 12, isNew: true },
      { id: 2, title: "Biomarker-Driven Treatments", replies: 8, isNew: true },
      { id: 3, title: "Combination Immunotherapies", replies: 15, isNew: false }
    ]
  },
  {
    id: 2,
    title: "Advances in Diabetes Management",
    description: "Exploring innovations in glucose monitoring technologies and treatment approaches",
    status: "active",
    topicCount: 5,
    messageCount: 29,
    lastActivity: "1 day ago",
    participantCount: 12,
    recentParticipants: [
      { id: 5, name: "Dr. Kim", avatar: null, specialty: "Endocrinology" },
      { id: 6, name: "Dr. Patel", avatar: null, specialty: "Primary Care" },
      { id: 7, name: "Dr. Suzuki", avatar: null, specialty: "Diabetology" }
    ],
    topics: [
      { id: 4, title: "Continuous Glucose Monitoring", replies: 7, isNew: true },
      { id: 5, title: "GLP-1 Receptor Agonists", replies: 11, isNew: false },
      { id: 6, title: "Digital Health Applications", replies: 6, isNew: false }
    ]
  },
  {
    id: 3,
    title: "Neurology Research Collaboration",
    description: "Collaborative discussions on neurological disorders and treatment approaches",
    status: "completed",
    topicCount: 9,
    messageCount: 63,
    lastActivity: "March 28, 2025",
    participantCount: 15,
    recentParticipants: [
      { id: 9, name: "Dr. Yamamoto", avatar: null, specialty: "Neurology" },
      { id: 10, name: "Dr. Wilson", avatar: null, specialty: "Neurosurgery" },
      { id: 11, name: "Dr. Lee", avatar: null, specialty: "Neuropsychiatry" }
    ],
    topics: [
      { id: 7, title: "Novel Approaches to Dementia", replies: 21, isNew: false },
      { id: 8, title: "Multiple Sclerosis Treatments", replies: 15, isNew: false },
      { id: 9, title: "Neuroinflammatory Disorders", replies: 18, isNew: false }
    ]
  },
  {
    id: 4,
    title: "Cardiology Best Practices",
    description: "Evidence-based discussions on cardiovascular care protocols and guidelines",
    status: "draft",
    topicCount: 0,
    messageCount: 0,
    lastActivity: "Not started",
    participantCount: 7,
    recentParticipants: [
      { id: 12, name: "Dr. Garcia", avatar: null, specialty: "Cardiology" },
      { id: 13, name: "Dr. Brown", avatar: null, specialty: "Cardiac Surgery" },
      { id: 14, name: "Dr. Nakamura", avatar: null, specialty: "Interventional Cardiology" }
    ],
    topics: []
  }
];

export default function DiscussionForumsTab() {
  const [view, setView] = useState("detailed"); // detailed or compact

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Active</Badge>;
      case 'completed':
        return <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30">Completed</Badge>;
      case 'draft':
        return <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Action Button based on status
  const getActionButton = (status: string) => {
    switch(status) {
      case 'active':
        return (
          <Button>
            <span className="material-icons text-sm mr-1">forum</span>
            Join Discussion
          </Button>
        );
      case 'completed':
        return (
          <Button variant="outline">
            <span className="material-icons text-sm mr-1">visibility</span>
            View Archive
          </Button>
        );
      case 'draft':
        return (
          <Button variant="outline">
            <span className="material-icons text-sm mr-1">edit</span>
            Setup Forum
          </Button>
        );
      default:
        return <Button variant="outline">View</Button>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Discussion Forums</h2>
          <p className="text-sm text-muted-foreground">
            Threaded conversations with flexible participation timing
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="border rounded-md p-1">
            <Button 
              variant={view === "detailed" ? "default" : "ghost"} 
              size="sm" 
              className="px-2"
              onClick={() => setView("detailed")}
            >
              <span className="material-icons text-sm">view_agenda</span>
            </Button>
            <Button 
              variant={view === "compact" ? "default" : "ghost"} 
              size="sm"
              className="px-2"
              onClick={() => setView("compact")}
            >
              <span className="material-icons text-sm">view_headline</span>
            </Button>
          </div>
          
          <Button>
            <span className="material-icons text-sm mr-1">add</span>
            New Forum
          </Button>
        </div>
      </div>
      
      {/* Detailed View */}
      {view === "detailed" && (
        <div className="space-y-6">
          {mockForums.map((forum) => (
            <Card key={forum.id} className={`overflow-hidden ${forum.status === 'active' ? 'border-green-500/50' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="mb-1 flex items-center">
                      {forum.title}
                      {forum.topics.some(topic => topic.isNew) && (
                        <Badge className="ml-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">New Activity</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{forum.description}</CardDescription>
                  </div>
                  {getStatusBadge(forum.status)}
                </div>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="flex flex-col md:flex-row md:justify-between">
                  {/* Forum Stats */}
                  <div className="flex space-x-6 mb-4 md:mb-0">
                    <div>
                      <p className="text-xs text-muted-foreground">Topics</p>
                      <p className="font-medium">{forum.topicCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Messages</p>
                      <p className="font-medium">{forum.messageCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last Activity</p>
                      <p className="font-medium">{forum.lastActivity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Participants</p>
                      <p className="font-medium">{forum.participantCount}</p>
                    </div>
                  </div>
                  
                  {/* Participants */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Recent Contributors</p>
                    <div className="flex items-center">
                      <AvatarGroup>
                        {forum.recentParticipants.map((participant) => (
                          <TooltipProvider key={participant.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className="border-2 border-background h-8 w-8">
                                  {participant.avatar ? (
                                    <AvatarImage src={participant.avatar} />
                                  ) : (
                                    <AvatarFallback className="text-xs">
                                      {participant.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  )}
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div>
                                  <div>{participant.name}</div>
                                  <div className="text-xs text-muted-foreground">{participant.specialty}</div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                        
                        {forum.participantCount > 3 && (
                          <Avatar className="border-2 border-background h-8 w-8 bg-muted">
                            <AvatarFallback className="text-xs">
                              +{forum.participantCount - 3}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </AvatarGroup>
                    </div>
                  </div>
                </div>
                
                {/* Recent Topics */}
                {forum.topics.length > 0 && (
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-sm font-medium mb-2">Recent Topics</p>
                    <div className="space-y-2">
                      {forum.topics.slice(0, 3).map((topic) => (
                        <div key={topic.id} className="flex justify-between items-center p-2 rounded-md hover:bg-background-lighter">
                          <div className="flex items-center">
                            <span className="material-icons text-muted-foreground mr-2 text-sm">chat</span>
                            <span className="font-medium text-sm">{topic.title}</span>
                            {topic.isNew && (
                              <Badge className="ml-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-xs">New</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{topic.replies} replies</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <span className="material-icons text-sm mr-1">topic</span>
                  All Topics
                </Button>
                {getActionButton(forum.status)}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Compact View */}
      {view === "compact" && (
        <div className="space-y-4">
          {mockForums.map((forum) => (
            <div 
              key={forum.id} 
              className={`border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between ${forum.status === 'active' ? 'border-green-500/50' : ''}`}
            >
              <div className="mb-4 md:mb-0 md:mr-4 md:flex-1">
                <div className="flex items-center mb-1">
                  {getStatusBadge(forum.status)}
                  {forum.topics.some(topic => topic.isNew) && (
                    <Badge className="ml-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">New Activity</Badge>
                  )}
                </div>
                <h3 className="font-medium">{forum.title}</h3>
                <div className="flex flex-wrap mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center mr-3">
                    <span className="material-icons text-xs mr-1">chat</span> {forum.topicCount} topics
                  </span>
                  <span className="flex items-center mr-3">
                    <span className="material-icons text-xs mr-1">forum</span> {forum.messageCount} messages
                  </span>
                  <span className="flex items-center">
                    <span className="material-icons text-xs mr-1">schedule</span> {forum.lastActivity}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <AvatarGroup max={3}>
                  {forum.recentParticipants.map((participant) => (
                    <Avatar key={participant.id} className="h-8 w-8 border-2 border-background">
                      <AvatarFallback className="text-xs">
                        {participant.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <span className="material-icons text-sm mr-1">topic</span>
                    Topics
                  </Button>
                  <Button size="sm" className={forum.status === 'draft' ? 'bg-amber-600 hover:bg-amber-700' : ''}>
                    {forum.status === 'active' && (
                      <span className="material-icons text-sm mr-1">forum</span>
                    )}
                    {forum.status === 'completed' && (
                      <span className="material-icons text-sm mr-1">visibility</span>
                    )}
                    {forum.status === 'draft' && (
                      <span className="material-icons text-sm mr-1">edit</span>
                    )}
                    {forum.status === 'active' && 'Join'}
                    {forum.status === 'completed' && 'View'}
                    {forum.status === 'draft' && 'Setup'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}