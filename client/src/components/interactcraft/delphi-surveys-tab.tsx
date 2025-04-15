import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Progress } from "@/components/ui/progress";

// Mock data for Delphi surveys
const mockSurveys = [
  {
    id: 1,
    title: "Lung Cancer Treatment Guidelines",
    description: "Multi-round consensus survey on NSCLC treatment pathways",
    status: "active",
    currentRound: 2,
    totalRounds: 3,
    progress: 65,
    dueDate: "Apr 15, 2025",
    participants: {
      total: 22,
      responded: 14,
      pending: 8
    },
    expertTypes: [
      { type: "Oncologists", count: 12 },
      { type: "Pulmonologists", count: 6 },
      { type: "Radiologists", count: 4 }
    ],
    recentParticipants: [
      { id: 1, name: "Dr. Tanaka", avatar: null, specialty: "Oncology" },
      { id: 2, name: "Dr. Chen", avatar: null, specialty: "Pulmonology" },
      { id: 3, name: "Dr. Smith", avatar: null, specialty: "Radiology" }
    ],
    consensusLevel: 72
  },
  {
    id: 2,
    title: "Future of Telemedicine in Cardiology",
    description: "Expert forecasting on telehealth adoption and impact on cardiac care",
    status: "active",
    currentRound: 1,
    totalRounds: 3,
    progress: 42,
    dueDate: "Apr 18, 2025",
    participants: {
      total: 18,
      responded: 8,
      pending: 10
    },
    expertTypes: [
      { type: "Cardiologists", count: 10 },
      { type: "Digital Health Specialists", count: 5 },
      { type: "Health System Administrators", count: 3 }
    ],
    recentParticipants: [
      { id: 5, name: "Dr. Garcia", avatar: null, specialty: "Cardiology" },
      { id: 6, name: "Dr. Park", avatar: null, specialty: "Digital Health" },
      { id: 7, name: "Dr. Kobayashi", avatar: null, specialty: "Cardiology" }
    ],
    consensusLevel: 36
  },
  {
    id: 3,
    title: "Antibiotic Resistance Management",
    description: "Consensus-building on antibiotic stewardship protocols",
    status: "completed",
    currentRound: 3,
    totalRounds: 3,
    progress: 100,
    dueDate: "Mar 30, 2025",
    participants: {
      total: 25,
      responded: 25,
      pending: 0
    },
    expertTypes: [
      { type: "Infectious Disease Specialists", count: 12 },
      { type: "Microbiologists", count: 8 },
      { type: "Pharmacists", count: 5 }
    ],
    recentParticipants: [
      { id: 9, name: "Dr. Wilson", avatar: null, specialty: "Infectious Disease" },
      { id: 10, name: "Dr. Nakamura", avatar: null, specialty: "Microbiology" },
      { id: 11, name: "Dr. Lee", avatar: null, specialty: "Pharmacy" }
    ],
    consensusLevel: 88
  },
  {
    id: 4,
    title: "Rare Disease Diagnosis Framework",
    description: "Structured approach to identifying key diagnostic criteria",
    status: "draft",
    currentRound: 0,
    totalRounds: 3,
    progress: 0,
    dueDate: "Not scheduled",
    participants: {
      total: 15,
      responded: 0,
      pending: 0
    },
    expertTypes: [
      { type: "Geneticists", count: 8 },
      { type: "Rare Disease Specialists", count: 7 }
    ],
    recentParticipants: [
      { id: 12, name: "Dr. Johnson", avatar: null, specialty: "Genetics" },
      { id: 13, name: "Dr. Brown", avatar: null, specialty: "Rare Diseases" }
    ],
    consensusLevel: 0
  }
];

export default function DelphiSurveysTab() {
  const [view, setView] = useState("cards");

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Active</Badge>;
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Completed</Badge>;
      case 'draft':
        return <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Round badge
  const getRoundBadge = (current: number, total: number) => {
    if (current === 0) return null;
    
    return (
      <Badge variant="outline" className="border-purple-500/50 text-purple-400">
        Round {current} of {total}
      </Badge>
    );
  };

  // Consensus level badge and styling
  const getConsensusIndicator = (level: number) => {
    let color = "";
    let textColor = "";
    
    if (level >= 75) {
      color = "bg-green-500/20";
      textColor = "text-green-400";
    } else if (level >= 50) {
      color = "bg-blue-500/20";
      textColor = "text-blue-400";
    } else if (level > 0) {
      color = "bg-amber-500/20";
      textColor = "text-amber-400";
    } else {
      color = "bg-gray-500/20";
      textColor = "text-gray-400";
    }
    
    return (
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-muted-foreground">Consensus Level</span>
          <span className={`text-xs font-medium ${textColor}`}>{level}%</span>
        </div>
        <div className="w-full h-2 bg-background-lighter rounded-full">
          <div 
            className={`h-2 ${color} rounded-full`} 
            style={{ width: `${level}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Action Button based on status
  const getActionButton = (status: string, currentRound: number) => {
    switch(status) {
      case 'active':
        return (
          <Button>
            <span className="material-icons text-sm mr-1">how_to_vote</span>
            Respond Now
          </Button>
        );
      case 'completed':
        return (
          <Button variant="outline">
            <span className="material-icons text-sm mr-1">analytics</span>
            View Results
          </Button>
        );
      case 'draft':
        return (
          <Button variant="outline">
            <span className="material-icons text-sm mr-1">edit</span>
            Edit Survey
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
          <h2 className="text-xl font-semibold">Delphi Surveys</h2>
          <p className="text-sm text-muted-foreground">
            Multi-round surveys with iterative feedback and consensus tracking
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="border rounded-md p-1">
            <Button 
              variant={view === "cards" ? "default" : "ghost"} 
              size="sm" 
              className="px-2"
              onClick={() => setView("cards")}
            >
              <span className="material-icons text-sm">dashboard</span>
            </Button>
            <Button 
              variant={view === "table" ? "default" : "ghost"} 
              size="sm"
              className="px-2"
              onClick={() => setView("table")}
            >
              <span className="material-icons text-sm">table_chart</span>
            </Button>
          </div>
          
          <Button
            onClick={() => {
              // This button will use the parent component's dialog
              // We'll access it through a custom event
              const customEvent = new CustomEvent('create-item', { 
                detail: { type: 'delphi-survey' } 
              });
              document.dispatchEvent(customEvent);
            }}
          >
            <span className="material-icons text-sm mr-1">add</span>
            New Survey
          </Button>
        </div>
      </div>
      
      {/* Cards View */}
      {view === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSurveys.map((survey) => (
            <Card key={survey.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-1 gap-2 flex-wrap">
                      {getStatusBadge(survey.status)}
                      {getRoundBadge(survey.currentRound, survey.totalRounds)}
                    </div>
                    <CardTitle>{survey.title}</CardTitle>
                    <CardDescription>{survey.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-4 space-y-4">
                {/* Progress */}
                {survey.status !== 'draft' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-muted-foreground">Overall Progress</span>
                      <span className="text-xs font-medium">{survey.progress}%</span>
                    </div>
                    <Progress value={survey.progress} className="h-2" />
                  </div>
                )}
                
                {/* Due Date & Participants */}
                <div className="flex justify-between items-start text-sm">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="material-icons text-muted-foreground mr-1 text-sm">event</span>
                      <span className="text-muted-foreground mr-1">Due:</span>
                      <span>{survey.dueDate}</span>
                    </div>
                    
                    {survey.status !== 'draft' && (
                      <div className="flex items-center">
                        <span className="material-icons text-muted-foreground mr-1 text-sm">group</span>
                        <span className="text-muted-foreground mr-1">Responses:</span>
                        <span>{survey.participants.responded}/{survey.participants.total}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Participants</div>
                    <AvatarGroup>
                      {survey.recentParticipants.map((participant) => (
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
                      
                      {survey.participants.total > 3 && (
                        <Avatar className="border-2 border-background h-8 w-8 bg-muted">
                          <AvatarFallback className="text-xs">
                            +{survey.participants.total - 3}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </AvatarGroup>
                  </div>
                </div>
                
                {/* Expert Types */}
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Expert Distribution</div>
                  <div className="flex flex-wrap gap-2">
                    {survey.expertTypes.map((expert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {expert.type} ({expert.count})
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Consensus Level */}
                {survey.status !== 'draft' && getConsensusIndicator(survey.consensusLevel)}
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between">
                <Button variant="outline" size="sm">
                  <span className="material-icons text-sm mr-1">analytics</span>
                  Details
                </Button>
                {getActionButton(survey.status, survey.currentRound)}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Table View */}
      {view === "table" && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground font-medium text-sm">Survey</th>
                    <th className="text-left p-3 text-muted-foreground font-medium text-sm">Status</th>
                    <th className="text-left p-3 text-muted-foreground font-medium text-sm">Round</th>
                    <th className="text-left p-3 text-muted-foreground font-medium text-sm">Due Date</th>
                    <th className="text-left p-3 text-muted-foreground font-medium text-sm">Responses</th>
                    <th className="text-left p-3 text-muted-foreground font-medium text-sm">Consensus</th>
                    <th className="text-right p-3 text-muted-foreground font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSurveys.map((survey) => (
                    <tr key={survey.id} className="border-b border-border hover:bg-background-lighter">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{survey.title}</div>
                          <div className="text-xs text-muted-foreground">{survey.description}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        {getStatusBadge(survey.status)}
                      </td>
                      <td className="p-3">
                        {survey.status === 'draft' ? (
                          <span className="text-xs text-muted-foreground">Not started</span>
                        ) : (
                          <span>
                            {survey.currentRound}/{survey.totalRounds}
                          </span>
                        )}
                      </td>
                      <td className="p-3">{survey.dueDate}</td>
                      <td className="p-3">
                        {survey.status === 'draft' ? (
                          <span className="text-xs text-muted-foreground">—</span>
                        ) : (
                          <span>{survey.participants.responded}/{survey.participants.total}</span>
                        )}
                      </td>
                      <td className="p-3">
                        {survey.status === 'draft' ? (
                          <span className="text-xs text-muted-foreground">—</span>
                        ) : (
                          <div className="flex items-center">
                            <div className="w-16 h-2 bg-background-lighter rounded-full mr-2">
                              <div 
                                className={`h-2 ${survey.consensusLevel >= 75 ? 'bg-green-500/20' : 
                                  survey.consensusLevel >= 50 ? 'bg-blue-500/20' : 
                                  survey.consensusLevel > 0 ? 'bg-amber-500/20' : 'bg-gray-500/20'} rounded-full`} 
                                style={{ width: `${survey.consensusLevel}%` }}
                              ></div>
                            </div>
                            <span className={
                              survey.consensusLevel >= 75 ? 'text-green-400' : 
                              survey.consensusLevel >= 50 ? 'text-blue-400' : 
                              survey.consensusLevel > 0 ? 'text-amber-400' : 'text-gray-400'
                            }>{survey.consensusLevel}%</span>
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex space-x-2 justify-end">
                          <Button variant="outline" size="sm">
                            <span className="material-icons text-sm">visibility</span>
                          </Button>
                          {survey.status === 'active' && (
                            <Button size="sm">
                              <span className="material-icons text-sm">how_to_vote</span>
                            </Button>
                          )}
                          {survey.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              <span className="material-icons text-sm">analytics</span>
                            </Button>
                          )}
                          {survey.status === 'draft' && (
                            <Button variant="outline" size="sm">
                              <span className="material-icons text-sm">edit</span>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}