import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for Delphi surveys
const mockDelphiSurveys = [
  {
    id: 1,
    title: "Breast Cancer Treatment Consensus",
    description: "Multi-round survey to build consensus on treatment approaches for advanced breast cancer",
    objective: "Develop consensus recommendations for treatment sequencing in metastatic breast cancer",
    status: "active",
    totalRounds: 3,
    currentRound: 2,
    participantsCount: 23,
    responsesCount: 18,
    consensusThreshold: 75,
    startDate: "Apr 8, 2025",
    endDate: "Apr 30, 2025",
    isAnonymous: true,
    roundDetails: [
      {
        roundNumber: 1,
        status: "completed",
        responseRate: 100,
        consensusRate: 42,
        startDate: "Apr 8, 2025",
        endDate: "Apr 15, 2025"
      },
      {
        roundNumber: 2,
        status: "active",
        responseRate: 78,
        consensusRate: 65,
        startDate: "Apr 16, 2025",
        endDate: "Apr 23, 2025"
      },
      {
        roundNumber: 3,
        status: "pending",
        responseRate: 0,
        consensusRate: 0,
        startDate: "Apr 24, 2025",
        endDate: "Apr 30, 2025"
      }
    ]
  },
  {
    id: 2,
    title: "Diabetes Management Guidelines",
    description: "Establishing consensus on guidelines for managing Type 2 diabetes with newer agents",
    objective: "Create updated clinical guidance for medication selection in Type 2 diabetes treatment",
    status: "draft",
    totalRounds: 2,
    currentRound: 0,
    participantsCount: 17,
    responsesCount: 0,
    consensusThreshold: 80,
    startDate: "Not scheduled",
    endDate: "",
    isAnonymous: true,
    roundDetails: []
  },
  {
    id: 3,
    title: "Rheumatoid Arthritis Treatment Sequencing",
    description: "Consensus survey on optimal treatment sequencing for rheumatoid arthritis",
    objective: "Develop evidence-based recommendations for biologic and JAK inhibitor sequencing",
    status: "completed",
    totalRounds: 3,
    currentRound: 3,
    participantsCount: 24,
    responsesCount: 24,
    consensusThreshold: 70,
    startDate: "Mar 10, 2025",
    endDate: "Apr 5, 2025",
    isAnonymous: true,
    roundDetails: [
      {
        roundNumber: 1,
        status: "completed",
        responseRate: 91,
        consensusRate: 38,
        startDate: "Mar 10, 2025",
        endDate: "Mar 17, 2025"
      },
      {
        roundNumber: 2,
        status: "completed",
        responseRate: 95,
        consensusRate: 72,
        startDate: "Mar 18, 2025",
        endDate: "Mar 25, 2025"
      },
      {
        roundNumber: 3,
        status: "completed",
        responseRate: 100,
        consensusRate: 89,
        startDate: "Mar 26, 2025",
        endDate: "Apr 5, 2025"
      }
    ]
  }
];

export default function DelphiSurveysTab() {
  const [selectedSurvey, setSelectedSurvey] = useState(mockDelphiSurveys[0]);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Completed</Badge>;
      case 'draft':
        return <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Round status badge styling
  const getRoundStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Consensus rate color styling
  const getConsensusRateColor = (rate: number, threshold: number) => {
    if (rate >= threshold) return "text-green-400";
    if (rate >= threshold * 0.75) return "text-amber-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Consensus-Building Surveys</h2>
          <p className="text-sm text-muted-foreground">
            Multi-round Delphi surveys with iterative feedback and consensus tracking
          </p>
        </div>
        
        <Button>
          <span className="material-icons text-sm mr-1">add</span>
          New Survey
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Survey List */}
        <div className="md:col-span-1">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4 pr-4">
              {mockDelphiSurveys.map((survey) => (
                <Card 
                  key={survey.id} 
                  className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedSurvey.id === survey.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedSurvey(survey)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{survey.title}</CardTitle>
                      {getStatusBadge(survey.status)}
                    </div>
                    <CardDescription>{survey.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0 pb-4">
                    <div className="mt-2 space-y-2">
                      {survey.status !== 'draft' && (
                        <>
                          <div className="flex justify-between items-center text-sm">
                            <span>Round {survey.currentRound} of {survey.totalRounds}</span>
                            <span className="text-muted-foreground text-xs">
                              Consensus Threshold: {survey.consensusThreshold}%
                            </span>
                          </div>
                          
                          {survey.status === 'active' && survey.roundDetails.length > 0 && (
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Response Rate</span>
                                <span>
                                  {survey.roundDetails[survey.currentRound - 1].responseRate}%
                                </span>
                              </div>
                              <Progress 
                                value={survey.roundDetails[survey.currentRound - 1].responseRate} 
                                className="h-2"
                              />
                            </div>
                          )}
                          
                          {survey.status === 'completed' && (
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="material-icons text-green-400 text-base">check_circle</span>
                              <span>
                                Achieved {survey.roundDetails[survey.roundDetails.length - 1].consensusRate}% consensus 
                                (threshold: {survey.consensusThreshold}%)
                              </span>
                            </div>
                          )}
                        </>
                      )}
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="material-icons text-xs mr-1">people</span>
                        <span>{survey.participantsCount} participants</span>
                        <span className="mx-2">•</span>
                        <span className="material-icons text-xs mr-1">calendar_today</span>
                        <span>{survey.startDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Survey Details */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <CardTitle>{selectedSurvey.title}</CardTitle>
                    {getStatusBadge(selectedSurvey.status)}
                    {selectedSurvey.isAnonymous && (
                      <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                        <span className="material-icons text-xs mr-1">visibility_off</span>
                        Anonymous
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{selectedSurvey.objective}</CardDescription>
                </div>
                
                <div className="flex space-x-2">
                  {selectedSurvey.status === 'draft' && (
                    <Button>
                      <span className="material-icons text-sm mr-1">play_arrow</span>
                      Launch Survey
                    </Button>
                  )}
                  
                  {selectedSurvey.status === 'active' && (
                    <Button>
                      <span className="material-icons text-sm mr-1">edit_note</span>
                      Submit Response
                    </Button>
                  )}
                  
                  {selectedSurvey.status === 'completed' && (
                    <Button>
                      <span className="material-icons text-sm mr-1">analytics</span>
                      Full Analysis
                    </Button>
                  )}
                  
                  <Button variant="outline">
                    <span className="material-icons text-sm mr-1">settings</span>
                    Manage
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <Tabs 
                defaultValue="overview" 
                value={selectedTab} 
                onValueChange={setSelectedTab}
                className="w-full"
              >
                <div className="border-b">
                  <TabsList className="bg-transparent h-auto p-0 pl-6 border-b-0 mb-0">
                    <TabsTrigger 
                      value="overview" 
                      className={`rounded-none py-3 px-4 border-b-2 ${selectedTab === 'overview' ? 'border-primary' : 'border-transparent'}`}
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="rounds" 
                      className={`rounded-none py-3 px-4 border-b-2 ${selectedTab === 'rounds' ? 'border-primary' : 'border-transparent'}`}
                    >
                      Rounds
                    </TabsTrigger>
                    <TabsTrigger 
                      value="participants" 
                      className={`rounded-none py-3 px-4 border-b-2 ${selectedTab === 'participants' ? 'border-primary' : 'border-transparent'}`}
                    >
                      Participants
                    </TabsTrigger>
                    <TabsTrigger 
                      value="consensus" 
                      className={`rounded-none py-3 px-4 border-b-2 ${selectedTab === 'consensus' ? 'border-primary' : 'border-transparent'}`}
                    >
                      Consensus Results
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-6">
                  <TabsContent value="overview" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium mb-4">Survey Details</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Status</span>
                            <span className="text-sm font-medium">{selectedSurvey.status}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Total Rounds</span>
                            <span className="text-sm font-medium">{selectedSurvey.totalRounds}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Current Round</span>
                            <span className="text-sm font-medium">
                              {selectedSurvey.status === 'draft' ? 'Not started' : selectedSurvey.currentRound}
                            </span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Start Date</span>
                            <span className="text-sm font-medium">{selectedSurvey.startDate}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">End Date</span>
                            <span className="text-sm font-medium">
                              {selectedSurvey.endDate || 'Not defined'}
                            </span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Consensus Threshold</span>
                            <span className="text-sm font-medium">{selectedSurvey.consensusThreshold}%</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Anonymous Responses</span>
                            <span className="text-sm font-medium">
                              {selectedSurvey.isAnonymous ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-4">Participation Summary</h3>
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Invited Participants</span>
                              <span>{selectedSurvey.participantsCount}</span>
                            </div>
                            <Progress value={100} className="h-2" />
                          </div>
                          
                          {selectedSurvey.status !== 'draft' && (
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Response Rate (Current Round)</span>
                                <span>
                                  {selectedSurvey.responsesCount} / {selectedSurvey.participantsCount}
                                  {" "}({Math.round((selectedSurvey.responsesCount / selectedSurvey.participantsCount) * 100)}%)
                                </span>
                              </div>
                              <Progress 
                                value={Math.round((selectedSurvey.responsesCount / selectedSurvey.participantsCount) * 100)} 
                                className="h-2"
                              />
                            </div>
                          )}
                          
                          {selectedSurvey.status === 'active' && selectedSurvey.currentRound > 1 && (
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Previous Round Consensus Rate</span>
                                <span className={getConsensusRateColor(
                                  selectedSurvey.roundDetails[selectedSurvey.currentRound - 2].consensusRate,
                                  selectedSurvey.consensusThreshold
                                )}>
                                  {selectedSurvey.roundDetails[selectedSurvey.currentRound - 2].consensusRate}%
                                </span>
                              </div>
                              <Progress 
                                value={selectedSurvey.roundDetails[selectedSurvey.currentRound - 2].consensusRate} 
                                className={`h-2 ${
                                  selectedSurvey.roundDetails[selectedSurvey.currentRound - 2].consensusRate >= selectedSurvey.consensusThreshold 
                                  ? 'bg-green-500' 
                                  : ''
                                }`}
                              />
                            </div>
                          )}
                          
                          {selectedSurvey.status === 'completed' && (
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Final Consensus Rate</span>
                                <span className={getConsensusRateColor(
                                  selectedSurvey.roundDetails[selectedSurvey.roundDetails.length - 1].consensusRate,
                                  selectedSurvey.consensusThreshold
                                )}>
                                  {selectedSurvey.roundDetails[selectedSurvey.roundDetails.length - 1].consensusRate}%
                                </span>
                              </div>
                              <Progress 
                                value={selectedSurvey.roundDetails[selectedSurvey.roundDetails.length - 1].consensusRate} 
                                className={`h-2 ${
                                  selectedSurvey.roundDetails[selectedSurvey.roundDetails.length - 1].consensusRate >= selectedSurvey.consensusThreshold 
                                  ? 'bg-green-500' 
                                  : ''
                                }`}
                              />
                            </div>
                          )}
                          
                          {selectedSurvey.status !== 'draft' && (
                            <div className="bg-primary/10 p-4 rounded-lg">
                              <h4 className="text-sm font-medium text-primary mb-2">AI Analysis Summary</h4>
                              <p className="text-xs">
                                {selectedSurvey.status === 'active' 
                                  ? 'Key areas of diverging opinions identified in Round 1: patient selection criteria and monitoring protocols. Round 2 already showing convergence on treatment duration.' 
                                  : 'The panel achieved strong consensus (89%) on treatment approach with key areas of agreement on first-line therapy selection, treatment sequencing, and monitoring protocols.'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rounds" className="m-0">
                    {selectedSurvey.roundDetails.length > 0 ? (
                      <div>
                        <h3 className="text-sm font-medium mb-4">Rounds Progress & Schedule</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Round</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Dates</TableHead>
                              <TableHead>Response Rate</TableHead>
                              <TableHead>Consensus Rate</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedSurvey.roundDetails.map((round) => (
                              <TableRow key={round.roundNumber}>
                                <TableCell className="font-medium">Round {round.roundNumber}</TableCell>
                                <TableCell>{getRoundStatusBadge(round.status)}</TableCell>
                                <TableCell>
                                  {round.startDate} - {round.endDate}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <Progress value={round.responseRate} className="h-2 w-16 mr-2" />
                                    <span>{round.responseRate}%</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <Progress value={round.consensusRate} className="h-2 w-16 mr-2" />
                                    <span className={
                                      round.consensusRate >= selectedSurvey.consensusThreshold 
                                      ? "text-green-400" 
                                      : ""
                                    }>
                                      {round.consensusRate}%
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  {round.status === 'active' && (
                                    <Button size="sm" variant="outline">
                                      <span className="material-icons text-xs mr-1">edit_note</span>
                                      Respond
                                    </Button>
                                  )}
                                  {round.status === 'completed' && (
                                    <Button size="sm" variant="outline">
                                      <span className="material-icons text-xs mr-1">bar_chart</span>
                                      Results
                                    </Button>
                                  )}
                                  {round.status === 'pending' && (
                                    <Button size="sm" variant="outline" disabled>
                                      <span className="material-icons text-xs mr-1">pending</span>
                                      Pending
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <span className="material-icons text-muted-foreground text-4xl mb-2">pending</span>
                        <h3 className="font-medium mb-1">No Rounds Scheduled</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          This survey is in draft mode and hasn't had any rounds scheduled yet.
                        </p>
                        <Button>
                          <span className="material-icons text-sm mr-1">schedule</span>
                          Schedule Rounds
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="participants" className="m-0">
                    <div className="text-center p-10">
                      <span className="material-icons text-muted-foreground text-4xl mb-2">people</span>
                      <h3 className="font-medium mb-1">Participant Details</h3>
                      <p className="text-sm text-muted-foreground">
                        This survey has {selectedSurvey.participantsCount} invited participants.
                        {selectedSurvey.status !== 'draft' && ` ${selectedSurvey.responsesCount} have responded in the current round.`}
                      </p>
                      <div className="flex justify-center mt-4">
                        <Button variant="outline" className="mr-2">
                          <span className="material-icons text-sm mr-1">person_add</span>
                          Add Participants
                        </Button>
                        <Button variant="outline">
                          <span className="material-icons text-sm mr-1">mail</span>
                          Send Reminders
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="consensus" className="m-0">
                    {selectedSurvey.status === 'completed' ? (
                      <div className="text-center p-10">
                        <span className="material-icons text-green-400 text-4xl mb-2">check_circle</span>
                        <h3 className="font-medium mb-1">Consensus Achieved</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          This survey has reached a final consensus rate of {selectedSurvey.roundDetails[selectedSurvey.roundDetails.length - 1].consensusRate}%,
                          above the required threshold of {selectedSurvey.consensusThreshold}%.
                        </p>
                        <Button>
                          <span className="material-icons text-sm mr-1">analytics</span>
                          View Detailed Results
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center p-10">
                        <span className="material-icons text-muted-foreground text-4xl mb-2">hourglass_empty</span>
                        <h3 className="font-medium mb-1">Results Not Available</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {selectedSurvey.status === 'draft' 
                            ? 'This survey is still in draft mode. Results will be available once rounds are completed.'
                            : `This survey is still in progress (Round ${selectedSurvey.currentRound} of ${selectedSurvey.totalRounds}).`}
                        </p>
                        {selectedSurvey.status === 'active' && (
                          <Button variant="outline">
                            <span className="material-icons text-sm mr-1">trending_up</span>
                            View Current Progress
                          </Button>
                        )}
                      </div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
            
            <CardFooter className="border-t">
              <div className="w-full flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Created on April 5, 2025 • Last updated {selectedSurvey.status === 'active' ? 'today' : 'April 10, 2025'}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <span className="material-icons text-sm mr-1">file_download</span>
                    Export Data
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}