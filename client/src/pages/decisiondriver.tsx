import { useState } from "react";
import DashboardHeader from "@/components/dashboard-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DecisionDriver = () => {
  const [reportType, setReportType] = useState("campaign");
  const [timeFrame, setTimeFrame] = useState("last30");

  return (
    <div className="container py-6 space-y-6">
      <DashboardHeader 
        title="DecisionDriver AI" 
        description="Transform engagement data into strategic decisions with AI-powered insights and recommendations"
        showBackButton={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader className="pb-3">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-lg">Report Generation & Analysis</CardTitle>
                <CardDescription>Create AI-driven reports from campaign and interaction data</CardDescription>
              </div>
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30">AI-Powered</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="campaign">Campaign Performance</SelectItem>
                    <SelectItem value="engagement">Engagement Analysis</SelectItem>
                    <SelectItem value="hcp">HCP Insights</SelectItem>
                    <SelectItem value="content">Content Effectiveness</SelectItem>
                    <SelectItem value="roi">ROI Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Time Frame</label>
                <Select value={timeFrame} onValueChange={setTimeFrame}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7">Last 7 Days</SelectItem>
                    <SelectItem value="last30">Last 30 Days</SelectItem>
                    <SelectItem value="last90">Last 90 Days</SelectItem>
                    <SelectItem value="thisyear">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md p-4 mb-4 bg-muted/30">
              <h3 className="text-sm font-medium mb-3">Data Sources</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="campaigns" className="rounded" defaultChecked />
                  <label htmlFor="campaigns" className="text-sm">Campaign Data</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="hcp" className="rounded" defaultChecked />
                  <label htmlFor="hcp" className="text-sm">HCP Profiles</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="interactions" className="rounded" defaultChecked />
                  <label htmlFor="interactions" className="text-sm">Interactions</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="content" className="rounded" defaultChecked />
                  <label htmlFor="content" className="text-sm">Content Performance</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="advisoryboards" className="rounded" />
                  <label htmlFor="advisoryboards" className="text-sm">Advisory Boards</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="surveys" className="rounded" />
                  <label htmlFor="surveys" className="text-sm">Survey Results</label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-3">Report Customization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Sections to Include</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="executive" className="rounded" defaultChecked />
                        <label htmlFor="executive" className="text-sm">Executive Summary</label>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="material-icons text-muted-foreground text-sm">info</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs w-60">AI-generated summary of key insights and findings for executive review</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="performance" className="rounded" defaultChecked />
                        <label htmlFor="performance" className="text-sm">Performance Metrics</label>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="material-icons text-muted-foreground text-sm">info</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs w-60">Detailed metrics showing key performance indicators</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="trends" className="rounded" defaultChecked />
                        <label htmlFor="trends" className="text-sm">Trend Analysis</label>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="material-icons text-muted-foreground text-sm">info</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs w-60">AI analysis of patterns and trends over the selected time period</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="recommendations" className="rounded" defaultChecked />
                        <label htmlFor="recommendations" className="text-sm">Recommendations</label>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="material-icons text-muted-foreground text-sm">info</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs w-60">AI-generated strategic recommendations based on data analysis</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Output Format</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <input type="radio" id="dashboard" name="format" className="rounded" defaultChecked />
                      <label htmlFor="dashboard" className="text-sm">Dashboard View</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="radio" id="pdf" name="format" className="rounded" />
                      <label htmlFor="pdf" className="text-sm">PDF Report</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="radio" id="presentation" name="format" className="rounded" />
                      <label htmlFor="presentation" className="text-sm">Presentation Slides</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="radio" id="csv" name="format" className="rounded" />
                      <label htmlFor="csv" className="text-sm">Raw Data (CSV)</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Save Template</Button>
              <Button>
                <span className="material-icons mr-2 text-sm">auto_awesome</span>
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">One-Click Reports</CardTitle>
              <CardDescription>Generate instant reports with predefined templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full border border-border hover:bg-background-lighter transition rounded-md p-3 text-left">
                <div className="flex items-center">
                  <span className="material-icons text-blue-400 mr-2">description</span>
                  <div>
                    <h3 className="text-sm font-medium">Monthly Performance</h3>
                    <p className="text-xs text-muted-foreground">Campaign metrics with trends</p>
                  </div>
                </div>
              </button>
              <button className="w-full border border-border hover:bg-background-lighter transition rounded-md p-3 text-left">
                <div className="flex items-center">
                  <span className="material-icons text-green-400 mr-2">insights</span>
                  <div>
                    <h3 className="text-sm font-medium">HCP Engagement</h3>
                    <p className="text-xs text-muted-foreground">Response rates by segment</p>
                  </div>
                </div>
              </button>
              <button className="w-full border border-border hover:bg-background-lighter transition rounded-md p-3 text-left">
                <div className="flex items-center">
                  <span className="material-icons text-purple-400 mr-2">trending_up</span>
                  <div>
                    <h3 className="text-sm font-medium">ROI Analysis</h3>
                    <p className="text-xs text-muted-foreground">Cost vs. outcomes breakdown</p>
                  </div>
                </div>
              </button>
              <button className="w-full border border-primary/30 bg-primary/5 hover:bg-primary/10 transition rounded-md p-3 text-left">
                <div className="flex items-center">
                  <span className="material-icons text-primary mr-2">auto_awesome</span>
                  <div>
                    <h3 className="text-sm font-medium">Executive Briefing</h3>
                    <p className="text-xs text-muted-foreground">AI-generated strategic overview</p>
                  </div>
                </div>
              </button>
              <div className="text-center mt-2">
                <Button variant="link" size="sm" className="text-xs">View All Templates</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Latest Insights</CardTitle>
              <CardDescription>AI-detected trends from your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border border-green-500/20 bg-green-500/5 rounded-md p-3">
                <div className="flex items-start space-x-2">
                  <span className="material-icons text-green-400">arrow_upward</span>
                  <div>
                    <h3 className="text-sm font-medium">Email Engagement Improved</h3>
                    <p className="text-xs text-muted-foreground mb-2">Open rates increased by 12% in the last 30 days for oncology specialists.</p>
                    <Button variant="link" size="sm" className="text-xs text-green-400 h-auto p-0">View Detailed Analysis</Button>
                  </div>
                </div>
              </div>
              <div className="border border-amber-500/20 bg-amber-500/5 rounded-md p-3">
                <div className="flex items-start space-x-2">
                  <span className="material-icons text-amber-400">priority_high</span>
                  <div>
                    <h3 className="text-sm font-medium">Content Gap Detected</h3>
                    <p className="text-xs text-muted-foreground mb-2">Cardiology HCPs requesting more educational materials on new treatments.</p>
                    <Button variant="link" size="sm" className="text-xs text-amber-400 h-auto p-0">View Recommendation</Button>
                  </div>
                </div>
              </div>
              <div className="border border-blue-500/20 bg-blue-500/5 rounded-md p-3">
                <div className="flex items-start space-x-2">
                  <span className="material-icons text-blue-400">insights</span>
                  <div>
                    <h3 className="text-sm font-medium">Correlation Discovered</h3>
                    <p className="text-xs text-muted-foreground mb-2">HCPs who participated in advisory boards show 3x higher prescription rates.</p>
                    <Button variant="link" size="sm" className="text-xs text-blue-400 h-auto p-0">Explore Connection</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="reporthistory" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="reporthistory">Report History</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reporthistory">
          <div className="border rounded-md">
            <div className="grid grid-cols-1 lg:grid-cols-7 p-3 border-b text-sm font-medium text-muted-foreground">
              <div className="lg:col-span-2">Report Name</div>
              <div className="hidden lg:block">Type</div>
              <div className="hidden lg:block">Created</div>
              <div className="hidden lg:block">Format</div>
              <div className="hidden lg:block">Status</div>
              <div className="lg:text-right">Actions</div>
            </div>
            
            <div className="divide-y">
              <div className="grid grid-cols-1 lg:grid-cols-7 p-3 items-center hover:bg-muted/20 transition">
                <div className="lg:col-span-2 font-medium mb-2 lg:mb-0">Q1 2025 Campaign Performance</div>
                <div className="text-sm text-muted-foreground mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Type:</span>
                  Performance Analysis
                </div>
                <div className="text-sm text-muted-foreground mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Created:</span>
                  Apr 12, 2025
                </div>
                <div className="text-sm mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Format:</span>
                  <Badge variant="outline">PDF + Dashboard</Badge>
                </div>
                <div className="mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Status:</span>
                  <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                </div>
                <div className="flex items-center justify-start lg:justify-end space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Share</Button>
                  <Button variant="ghost" size="sm">
                    <span className="material-icons text-muted-foreground text-lg">more_vert</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-7 p-3 items-center hover:bg-muted/20 transition">
                <div className="lg:col-span-2 font-medium mb-2 lg:mb-0">HCP Engagement Deep Dive</div>
                <div className="text-sm text-muted-foreground mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Type:</span>
                  Engagement Analysis
                </div>
                <div className="text-sm text-muted-foreground mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Created:</span>
                  Apr 8, 2025
                </div>
                <div className="text-sm mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Format:</span>
                  <Badge variant="outline">Presentation</Badge>
                </div>
                <div className="mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Status:</span>
                  <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                </div>
                <div className="flex items-center justify-start lg:justify-end space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Share</Button>
                  <Button variant="ghost" size="sm">
                    <span className="material-icons text-muted-foreground text-lg">more_vert</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-7 p-3 items-center hover:bg-muted/20 transition">
                <div className="lg:col-span-2 font-medium mb-2 lg:mb-0">Oncology Specialist ROI Report</div>
                <div className="text-sm text-muted-foreground mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Type:</span>
                  ROI Analysis
                </div>
                <div className="text-sm text-muted-foreground mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Created:</span>
                  Apr 5, 2025
                </div>
                <div className="text-sm mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Format:</span>
                  <Badge variant="outline">Dashboard</Badge>
                </div>
                <div className="mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Status:</span>
                  <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                </div>
                <div className="flex items-center justify-start lg:justify-end space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Share</Button>
                  <Button variant="ghost" size="sm">
                    <span className="material-icons text-muted-foreground text-lg">more_vert</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-7 p-3 items-center hover:bg-muted/20 transition">
                <div className="lg:col-span-2 font-medium mb-2 lg:mb-0">Executive Strategy Brief</div>
                <div className="text-sm text-muted-foreground mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Type:</span>
                  Executive Summary
                </div>
                <div className="text-sm text-muted-foreground mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Created:</span>
                  Apr 1, 2025
                </div>
                <div className="text-sm mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Format:</span>
                  <Badge variant="outline">PDF</Badge>
                </div>
                <div className="mb-2 lg:mb-0 flex lg:block items-center">
                  <span className="lg:hidden mr-2">Status:</span>
                  <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                </div>
                <div className="flex items-center justify-start lg:justify-end space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Share</Button>
                  <Button variant="ghost" size="sm">
                    <span className="material-icons text-muted-foreground text-lg">more_vert</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-2">High Impact</Badge>
                    <CardTitle>Optimize Content Strategy</CardTitle>
                    <CardDescription>Based on HCP engagement patterns</CardDescription>
                  </div>
                  <ProgressCircle value={92} size="lg" strokeWidth={5} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analysis shows that educational content about treatment side effects receives 3x higher
                  engagement from oncology specialists compared to general product information.
                </p>
                <h4 className="text-sm font-medium mb-2">Recommended Actions:</h4>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Produce more educational content focused on managing treatment side effects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Segment content delivery to prioritize educational materials for oncologists</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Schedule content delivery during peak engagement times (Tuesday/Thursday afternoons)</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expected impact:</span>
                  <span className="font-medium text-green-400">+42% engagement</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Data</Button>
                <Button size="sm">Implement</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 mb-2">Medium Impact</Badge>
                    <CardTitle>Engagement Channel Mix</CardTitle>
                    <CardDescription>Optimize multi-channel strategy</CardDescription>
                  </div>
                  <ProgressCircle value={78} size="lg" strokeWidth={5} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  HCPs who are engaged through at least 3 different channels show 78% higher response rates
                  and are 2.5x more likely to prescribe targeted products.
                </p>
                <h4 className="text-sm font-medium mb-2">Recommended Actions:</h4>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Implement coordinated multi-channel campaigns with consistent messaging</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Add advisory board invitations for high-value HCPs currently engaged on just 1-2 channels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Develop channel-specific content variants to maintain engagement</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expected impact:</span>
                  <span className="font-medium text-green-400">+29% response rate</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Data</Button>
                <Button size="sm">Implement</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 mb-2">Medium Impact</Badge>
                    <CardTitle>HCP Segmentation Update</CardTitle>
                    <CardDescription>Refine target audience approach</CardDescription>
                  </div>
                  <ProgressCircle value={65} size="lg" strokeWidth={5} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Current HCP segmentation model could be improved by incorporating digital behavior patterns.
                  We've identified 3 new micro-segments within the "Evidence-Driven" group.
                </p>
                <h4 className="text-sm font-medium mb-2">Recommended Actions:</h4>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Update MediTag Engine with new "Digital Adoption" scoring factor</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Apply revised segmentation to upcoming campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Develop specialized content for the "Research-Focused Digital Adopters" micro-segment</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expected impact:</span>
                  <span className="font-medium text-green-400">+18% targeting precision</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Data</Button>
                <Button size="sm">Implement</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 mb-2">Medium Impact</Badge>
                    <CardTitle>Engagement Timing Optimization</CardTitle>
                    <CardDescription>Timing preference analysis</CardDescription>
                  </div>
                  <ProgressCircle value={70} size="lg" strokeWidth={5} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Time-based analysis reveals distinct patterns in HCP receptiveness to different types of content
                  and communication channels based on day of week and time of day.
                </p>
                <h4 className="text-sm font-medium mb-2">Recommended Actions:</h4>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Schedule educational emails for Tuesday and Wednesday mornings (7-9am)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Schedule product updates for Thursday afternoons (2-4pm)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                    <span>Implement automated timing optimization in EngageOptic module</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expected impact:</span>
                  <span className="font-medium text-green-400">+22% open rate</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Data</Button>
                <Button size="sm">Implement</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Report Usage Analytics</CardTitle>
                <CardDescription>How reports are being used across the organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-icons text-4xl text-muted-foreground mb-2">bar_chart</span>
                    <p className="text-muted-foreground">Analytics visualization would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Reports</CardTitle>
                <CardDescription>Most frequently accessed reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Campaign Performance</h3>
                      <p className="text-xs text-muted-foreground">Monthly report</p>
                    </div>
                    <span className="text-sm font-medium">86 views</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Executive Summary</h3>
                      <p className="text-xs text-muted-foreground">Quarterly report</p>
                    </div>
                    <span className="text-sm font-medium">73 views</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">HCP Engagement</h3>
                      <p className="text-xs text-muted-foreground">Weekly report</p>
                    </div>
                    <span className="text-sm font-medium">59 views</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">ROI Analysis</h3>
                      <p className="text-xs text-muted-foreground">Quarterly report</p>
                    </div>
                    <span className="text-sm font-medium">42 views</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Content Performance</h3>
                      <p className="text-xs text-muted-foreground">Monthly report</p>
                    </div>
                    <span className="text-sm font-medium">38 views</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Time Saved</CardTitle>
                <CardDescription>Efficiency gained through automated reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-40">
                  <h3 className="text-4xl font-bold mb-2">78 hours</h3>
                  <p className="text-sm text-muted-foreground text-center">Saved in the last 30 days through automated reporting</p>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Manual report creation</span>
                    <span className="text-sm font-medium">-92%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Data analysis time</span>
                    <span className="text-sm font-medium">-86%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Strategic planning</span>
                    <span className="text-sm font-medium">+64%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Implementation Stats</CardTitle>
                <CardDescription>AI recommendation adoption rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 w-full bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-icons text-4xl text-muted-foreground mb-2">analytics</span>
                    <p className="text-muted-foreground">Implementation analytics visualization would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DecisionDriver;