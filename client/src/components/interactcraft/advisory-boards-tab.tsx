import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";

// Mock data for advisory board cards
const mockAdvisoryBoards = [
  {
    id: 1,
    title: "Oncology Treatment Pathways",
    description: "Discussion on novel approaches to oncology treatment sequencing and personalization",
    status: "scheduled",
    date: "Apr 20, 2025",
    time: "14:00-16:00 JST",
    format: "video",
    participants: [
      { id: 1, name: "Dr. Tanaka", avatar: null, specialty: "Oncology" },
      { id: 2, name: "Dr. Chen", avatar: null, specialty: "Hematology" },
      { id: 3, name: "Dr. Smith", avatar: null, specialty: "Radiation Oncology" },
      { id: 4, name: "Dr. Yamamoto", avatar: null, specialty: "Medical Oncology" }
    ]
  },
  {
    id: 2,
    title: "Diabetes Management Innovations",
    description: "Expert panel on emerging technologies and therapies for diabetes care",
    status: "in_progress",
    date: "Active Now",
    time: "",
    format: "hybrid",
    participants: [
      { id: 5, name: "Dr. Kim", avatar: null, specialty: "Endocrinology" },
      { id: 6, name: "Dr. Patel", avatar: null, specialty: "Primary Care" },
      { id: 7, name: "Dr. Suzuki", avatar: null, specialty: "Diabetology" }
    ]
  },
  {
    id: 3,
    title: "Cardiology Drug Development",
    description: "Advisory session on pipeline drugs and clinical trial designs",
    status: "completed",
    date: "Apr 10, 2025",
    time: "09:00-11:30 JST",
    format: "video",
    participants: [
      { id: 8, name: "Dr. Johnson", avatar: null, specialty: "Cardiology" },
      { id: 9, name: "Dr. Nakamura", avatar: null, specialty: "Interventional Cardiology" },
      { id: 10, name: "Dr. Wang", avatar: null, specialty: "Electrophysiology" },
      { id: 11, name: "Dr. Garcia", avatar: null, specialty: "Heart Failure" }
    ]
  },
  {
    id: 4,
    title: "Neurology Treatment Guidelines",
    description: "Collaborative session to develop consensus on treatment protocols",
    status: "draft",
    date: "Not scheduled",
    time: "",
    format: "text",
    participants: [
      { id: 12, name: "Dr. Sato", avatar: null, specialty: "Neurology" },
      { id: 13, name: "Dr. Miller", avatar: null, specialty: "Neurosurgery" }
    ]
  }
];

export default function AdvisoryBoardsTab() {
  const [view, setView] = useState("grid"); // grid or list

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'scheduled':
        return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Scheduled</Badge>;
      case 'in_progress':
        return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30">Completed</Badge>;
      case 'draft':
        return <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Format badge styling
  const getFormatBadge = (format: string) => {
    switch(format) {
      case 'video':
        return (
          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
            <span className="material-icons text-xs mr-1">videocam</span> Video
          </Badge>
        );
      case 'audio':
        return (
          <Badge variant="outline" className="border-indigo-500/50 text-indigo-400">
            <span className="material-icons text-xs mr-1">mic</span> Audio
          </Badge>
        );
      case 'text':
        return (
          <Badge variant="outline" className="border-slate-500/50 text-slate-400">
            <span className="material-icons text-xs mr-1">chat</span> Text
          </Badge>
        );
      case 'hybrid':
        return (
          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
            <span className="material-icons text-xs mr-1">sensors</span> Hybrid
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Button based on status
  const getActionButton = (status: string) => {
    switch(status) {
      case 'scheduled':
        return (
          <Button>
            <span className="material-icons text-sm mr-1">login</span>
            Join Session
          </Button>
        );
      case 'in_progress':
        return (
          <Button variant="default">
            <span className="material-icons text-sm mr-1">login</span>
            Rejoin Session
          </Button>
        );
      case 'completed':
        return (
          <Button variant="outline">
            <span className="material-icons text-sm mr-1">assessment</span>
            View Summary
          </Button>
        );
      case 'draft':
        return (
          <Button variant="outline">
            <span className="material-icons text-sm mr-1">edit</span>
            Edit Draft
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
          <h2 className="text-xl font-semibold">Virtual Advisory Boards</h2>
          <p className="text-sm text-muted-foreground">
            Structured live and asynchronous sessions with healthcare experts
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="border rounded-md p-1">
            <Button 
              variant={view === "grid" ? "default" : "ghost"} 
              size="sm" 
              className="px-2"
              onClick={() => setView("grid")}
            >
              <span className="material-icons text-sm">grid_view</span>
            </Button>
            <Button 
              variant={view === "list" ? "default" : "ghost"} 
              size="sm"
              className="px-2"
              onClick={() => setView("list")}
            >
              <span className="material-icons text-sm">view_list</span>
            </Button>
          </div>
          
          <Button>
            <span className="material-icons text-sm mr-1">add</span>
            New Board
          </Button>
        </div>
      </div>
      
      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockAdvisoryBoards.map((board) => (
            <Card key={board.id} className={`overflow-hidden ${board.status === 'in_progress' ? 'border-green-500/50' : ''}`}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="mb-1">{board.title}</CardTitle>
                    <CardDescription>{board.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    {getStatusBadge(board.status)}
                    {getFormatBadge(board.format)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-4">
                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <div className="flex items-center">
                      <span className="material-icons text-muted-foreground mr-1 text-sm">event</span>
                      <span>{board.date}</span>
                    </div>
                    {board.time && (
                      <div className="flex items-center mt-1">
                        <span className="material-icons text-muted-foreground mr-1 text-sm">schedule</span>
                        <span>{board.time}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Participants</div>
                    <AvatarGroup>
                      {board.participants.slice(0, 3).map((participant) => (
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
                      
                      {board.participants.length > 3 && (
                        <Avatar className="border-2 border-background h-8 w-8 bg-muted">
                          <AvatarFallback className="text-xs">
                            +{board.participants.length - 3}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </AvatarGroup>
                  </div>
                </div>
                
                {board.status === 'in_progress' && (
                  <div className="bg-green-500/10 p-2 rounded text-green-400 text-xs flex items-center mb-2">
                    <span className="material-icons text-sm mr-1">radio_button_checked</span>
                    <span>Session in progress - 4 participants active</span>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between">
                <Button variant="outline" size="sm">
                  <span className="material-icons text-sm mr-1">visibility</span>
                  Details
                </Button>
                {getActionButton(board.status)}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* List View */}
      {view === "list" && (
        <div className="space-y-4">
          {mockAdvisoryBoards.map((board) => (
            <div 
              key={board.id} 
              className={`border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between ${board.status === 'in_progress' ? 'border-green-500/50' : ''}`}
            >
              <div className="mb-4 md:mb-0 md:mr-4 md:flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {getStatusBadge(board.status)}
                  {getFormatBadge(board.format)}
                </div>
                <h3 className="font-medium">{board.title}</h3>
                <p className="text-sm text-muted-foreground">{board.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                <div className="flex items-center text-sm mr-4">
                  <span className="material-icons text-muted-foreground mr-1 text-sm">event</span>
                  <span>{board.date}</span>
                  {board.time && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{board.time}</span>
                    </>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <span className="material-icons text-sm mr-1">visibility</span>
                    Details
                  </Button>
                  {getActionButton(board.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}