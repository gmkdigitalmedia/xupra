import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";

// Mock data for discussion forums
const mockForums = [
  {
    id: 1,
    title: "Clinical Practice in Oncology",
    category: "Oncology",
    description: "Discuss emerging approaches in clinical oncology practice",
    status: "active",
    isModerated: true,
    lastActivity: "1 hour ago",
    topicCount: 12,
    participants: 28,
    topics: [
      {
        id: 101,
        title: "Immunotherapy Response Biomarkers",
        author: "Dr. Tanaka",
        date: "Apr 13, 2025",
        replyCount: 24,
        viewCount: 156,
        lastReply: "20 minutes ago"
      },
      {
        id: 102,
        title: "Patient Selection for CAR-T Therapy",
        author: "Dr. Wilson",
        date: "Apr 11, 2025",
        replyCount: 18,
        viewCount: 94,
        lastReply: "4 hours ago"
      },
      {
        id: 103,
        title: "Managing Chemotherapy Side Effects",
        author: "Dr. Garcia",
        date: "Apr 9, 2025",
        replyCount: 31,
        viewCount: 203,
        lastReply: "Yesterday"
      }
    ]
  },
  {
    id: 2,
    title: "Cardiovascular Treatment Updates",
    category: "Cardiology",
    description: "Latest advancements and guidelines in cardiovascular care",
    status: "active",
    isModerated: true,
    lastActivity: "30 minutes ago",
    topicCount: 8,
    participants: 22,
    topics: [
      {
        id: 201,
        title: "Novel Anticoagulants in Practice",
        author: "Dr. Yamamoto",
        date: "Apr 14, 2025",
        replyCount: 16,
        viewCount: 88,
        lastReply: "30 minutes ago"
      },
      {
        id: 202,
        title: "Heart Failure Management Strategies",
        author: "Dr. Thompson",
        date: "Apr 13, 2025",
        replyCount: 29,
        viewCount: 176,
        lastReply: "2 hours ago"
      }
    ]
  },
  {
    id: 3,
    title: "Neurology Research & Practice",
    category: "Neurology",
    description: "Bridging research findings with clinical neurology applications",
    status: "active",
    isModerated: false,
    lastActivity: "2 days ago",
    topicCount: 15,
    participants: 19,
    topics: [
      {
        id: 301,
        title: "Advances in MS Therapies",
        author: "Dr. Patel",
        date: "Apr 12, 2025",
        replyCount: 11,
        viewCount: 67,
        lastReply: "2 days ago"
      }
    ]
  },
  {
    id: 4,
    title: "Endocrinology Case Studies",
    category: "Endocrinology",
    description: "Peer discussion on challenging endocrinology cases",
    status: "archived",
    isModerated: true,
    lastActivity: "1 month ago",
    topicCount: 22,
    participants: 35,
    topics: []
  }
];

export default function DiscussionForumsTab() {
  const [selectedForum, setSelectedForum] = useState(mockForums[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Active</Badge>;
      case 'archived':
        return <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30">Archived</Badge>;
      case 'draft':
        return <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Time ago styling
  const getTimeAgoStyle = (timeAgo: string) => {
    if (timeAgo.includes("minute") || timeAgo.includes("hour") || timeAgo === "Today") {
      return "text-green-400";
    }
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Asynchronous Discussion Forums</h2>
          <p className="text-sm text-muted-foreground">
            Threaded conversations with flexible participation timing
          </p>
        </div>
        
        <Button>
          <span className="material-icons text-sm mr-1">add</span>
          New Forum
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Forums List */}
        <div className="md:col-span-1 space-y-4">
          <Input 
            placeholder="Search forums..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          
          {mockForums.map((forum) => (
            <Card 
              key={forum.id} 
              className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedForum.id === forum.id ? 'border-primary' : ''}`}
              onClick={() => setSelectedForum(forum)}
            >
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{forum.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{forum.description}</p>
                  </div>
                  {getStatusBadge(forum.status)}
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <span className="material-icons text-xs mr-1">forum</span>
                      <span>{forum.topicCount} topics</span>
                    </div>
                    <div className="flex items-center">
                      <span className="material-icons text-xs mr-1">people</span>
                      <span>{forum.participants} participants</span>
                    </div>
                  </div>
                  
                  <div className={`flex items-center ${getTimeAgoStyle(forum.lastActivity)}`}>
                    <span className="material-icons text-xs mr-1">update</span>
                    <span>{forum.lastActivity}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
          
          <Button variant="outline" className="w-full">
            <span className="material-icons text-sm mr-1">more_horiz</span>
            View All Forums
          </Button>
        </div>
        
        {/* Topics List */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-3 flex-row items-start justify-between">
              <div>
                <CardTitle>{selectedForum.title}</CardTitle>
                <div className="flex items-center mt-1 space-x-2">
                  <Badge variant="outline">{selectedForum.category}</Badge>
                  {selectedForum.isModerated && (
                    <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                      <span className="material-icons text-xs mr-1">verified</span>
                      Moderated
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <span className="material-icons text-sm mr-1">settings</span>
                  Manage
                </Button>
                <Button size="sm">
                  <span className="material-icons text-sm mr-1">add</span>
                  New Topic
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              {selectedForum.topics.length > 0 ? (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {selectedForum.topics.map((topic) => (
                      <div 
                        key={topic.id} 
                        className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{topic.title}</h3>
                          <Badge variant="outline" className="ml-2">
                            <span className="material-icons text-xs mr-1">question_answer</span>
                            {topic.replyCount}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarFallback className="text-xs">
                                      {topic.author.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div>{topic.author}</div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <span className="text-muted-foreground">{topic.author}</span>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{topic.date}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-xs">
                            <div className="flex items-center text-muted-foreground">
                              <span className="material-icons text-xs mr-1">visibility</span>
                              <span>{topic.viewCount}</span>
                            </div>
                            <div className={`flex items-center ${getTimeAgoStyle(topic.lastReply)}`}>
                              <span className="material-icons text-xs mr-1">update</span>
                              <span>{topic.lastReply}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="h-[400px] flex items-center justify-center">
                  <div className="text-center p-6">
                    <span className="material-icons text-muted-foreground text-4xl mb-2">forum</span>
                    <h3 className="font-medium mb-1">No Topics Yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This forum doesn't have any active discussion topics.
                    </p>
                    <Button>
                      <span className="material-icons text-sm mr-1">add</span>
                      Create First Topic
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}