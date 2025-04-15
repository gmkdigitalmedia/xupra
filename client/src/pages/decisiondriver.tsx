import { useState } from "react";
import DashboardHeader from "@/components/dashboard-header";
import Sidebar from "@/components/sidebar";
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<{
    id: number;
    type: string;
    timeFrame: string;
    date: string;
    status: string;
  } | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Function to handle report generation with optional preset report type
  const handleGenerateReport = (presetType?: string, presetTimeFrame?: string) => {
    setIsGenerating(true);
    
    // Use preset values or form values
    const reportTypeToUse = presetType || reportType;
    const timeFrameToUse = presetTimeFrame || timeFrame;
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport({
        id: Math.floor(Math.random() * 10000),
        type: reportTypeToUse,
        timeFrame: timeFrameToUse,
        date: new Date().toLocaleDateString(),
        status: 'Complete'
      });
      setShowSuccessMessage(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1500);
  };
  
  // Function to handle template save
  const handleSaveTemplate = () => {
    alert('Template saved successfully!');
  };
  
  // Function to handle one-click report generation
  const handleOneClickReport = (reportName: string) => {
    // Determine report type and time frame based on report name
    let presetType: string;
    let presetTimeFrame: string;
    
    switch (reportName) {
      case 'monthly':
        presetType = 'campaign';
        presetTimeFrame = 'last30';
        break;
      case 'hcp':
        presetType = 'hcp';
        presetTimeFrame = 'last90';
        break;
      case 'roi':
        presetType = 'roi';
        presetTimeFrame = 'thisyear';
        break;
      case 'executive':
        presetType = 'engagement';
        presetTimeFrame = 'last30';
        break;
      default:
        presetType = 'campaign';
        presetTimeFrame = 'last30';
    }
    
    // Generate report with preset values
    handleGenerateReport(presetType, presetTimeFrame);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
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
                
                {showSuccessMessage && (
                  <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 flex items-center">
                    <span className="material-icons mr-2">check_circle</span>
                    <div>
                      <p className="font-medium text-sm">Report generated successfully!</p>
                      <p className="text-xs">Report ID: {generatedReport?.id} - {generatedReport?.type} analysis for {generatedReport?.timeFrame}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleSaveTemplate}>Save Template</Button>
                  <Button 
                    onClick={() => handleGenerateReport()} 
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <span className="material-icons animate-spin mr-2 text-sm">refresh</span>
                        Generating...
                      </>
                    ) : (
                      <>
                        <span className="material-icons mr-2 text-sm">auto_awesome</span>
                        Generate Report
                      </>
                    )}
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
                  <button 
                    className="w-full border border-border hover:bg-background-lighter transition rounded-md p-3 text-left"
                    onClick={() => handleOneClickReport('monthly')}
                    disabled={isGenerating}
                  >
                    <div className="flex items-center">
                      <span className="material-icons text-blue-400 mr-2">description</span>
                      <div>
                        <h3 className="text-sm font-medium">Monthly Performance</h3>
                        <p className="text-xs text-muted-foreground">Campaign metrics with trends</p>
                      </div>
                    </div>
                  </button>
                  <button 
                    className="w-full border border-border hover:bg-background-lighter transition rounded-md p-3 text-left"
                    onClick={() => handleOneClickReport('hcp')}
                    disabled={isGenerating}
                  >
                    <div className="flex items-center">
                      <span className="material-icons text-green-400 mr-2">insights</span>
                      <div>
                        <h3 className="text-sm font-medium">HCP Engagement</h3>
                        <p className="text-xs text-muted-foreground">Response rates by segment</p>
                      </div>
                    </div>
                  </button>
                  <button 
                    className="w-full border border-border hover:bg-background-lighter transition rounded-md p-3 text-left"
                    onClick={() => handleOneClickReport('roi')}
                    disabled={isGenerating}
                  >
                    <div className="flex items-center">
                      <span className="material-icons text-purple-400 mr-2">trending_up</span>
                      <div>
                        <h3 className="text-sm font-medium">ROI Analysis</h3>
                        <p className="text-xs text-muted-foreground">Cost vs. outcomes breakdown</p>
                      </div>
                    </div>
                  </button>
                  <button 
                    className="w-full border border-primary/30 bg-primary/5 hover:bg-primary/10 transition rounded-md p-3 text-left"
                    onClick={() => handleOneClickReport('executive')}
                    disabled={isGenerating}
                  >
                    <div className="flex items-center">
                      <span className="material-icons text-primary mr-2">auto_awesome</span>
                      <div>
                        <h3 className="text-sm font-medium">Executive Briefing</h3>
                        <p className="text-xs text-muted-foreground">AI-generated strategic overview</p>
                      </div>
                    </div>
                  </button>
                  <div className="text-center mt-2">
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => alert('More templates will be available in a future update.')}
                    >
                      View All Templates
                    </Button>
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
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-xs text-green-400 h-auto p-0"
                          onClick={() => {
                            setReportType('engagement');
                            setTimeFrame('last30');
                            handleGenerateReport('engagement', 'last30');
                          }}
                        >
                          View Detailed Analysis
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="border border-amber-500/20 bg-amber-500/5 rounded-md p-3">
                    <div className="flex items-start space-x-2">
                      <span className="material-icons text-amber-400">priority_high</span>
                      <div>
                        <h3 className="text-sm font-medium">Content Gap Detected</h3>
                        <p className="text-xs text-muted-foreground mb-2">Cardiology HCPs requesting more educational materials on new treatments.</p>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-xs text-amber-400 h-auto p-0"
                          onClick={() => {
                            setReportType('content');
                            setTimeFrame('last90');
                            handleGenerateReport('content', 'last90');
                          }}
                        >
                          View Recommendation
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="border border-blue-500/20 bg-blue-500/5 rounded-md p-3">
                    <div className="flex items-start space-x-2">
                      <span className="material-icons text-blue-400">insights</span>
                      <div>
                        <h3 className="text-sm font-medium">Correlation Discovered</h3>
                        <p className="text-xs text-muted-foreground mb-2">HCPs who participated in advisory boards show 3x higher prescription rates.</p>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-xs text-blue-400 h-auto p-0"
                          onClick={() => {
                            setReportType('hcp');
                            setTimeFrame('thisyear');
                            handleGenerateReport('hcp', 'thisyear');
                          }}
                        >
                          Explore Connection
                        </Button>
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
              <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
              <TabsTrigger value="engagement">Engagement Index</TabsTrigger>
            </TabsList>
            <TabsContent value="reporthistory">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm">Monthly Performance Report</CardTitle>
                      <Badge variant="outline">PDF</Badge>
                    </div>
                    <CardDescription className="text-xs">Generated May 1, 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <p>Oncology campaign performance with ROI analysis and recommendations for Q2 strategy.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="link" size="sm" className="text-xs h-8 px-0">
                      <span className="material-icons mr-1 text-sm">download</span>
                      Download
                    </Button>
                    <Button variant="link" size="sm" className="text-xs h-8 px-0">
                      <span className="material-icons mr-1 text-sm">share</span>
                      Share
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm">HCP Engagement Analysis</CardTitle>
                      <Badge variant="outline">Dashboard</Badge>
                    </div>
                    <CardDescription className="text-xs">Generated Apr 15, 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <p>Segmentation analysis of content performance across 3 audience profiles.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="link" size="sm" className="text-xs h-8 px-0">
                      <span className="material-icons mr-1 text-sm">visibility</span>
                      View
                    </Button>
                    <Button variant="link" size="sm" className="text-xs h-8 px-0">
                      <span className="material-icons mr-1 text-sm">share</span>
                      Share
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm">Quarterly ROI Report</CardTitle>
                      <Badge variant="outline">Slides</Badge>
                    </div>
                    <CardDescription className="text-xs">Generated Apr 1, 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <p>Executive summary of Q1 campaign performance with cost-benefit analysis.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="link" size="sm" className="text-xs h-8 px-0">
                      <span className="material-icons mr-1 text-sm">download</span>
                      Download
                    </Button>
                    <Button variant="link" size="sm" className="text-xs h-8 px-0">
                      <span className="material-icons mr-1 text-sm">edit</span>
                      Duplicate
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="metrics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Engagement Rate</CardTitle>
                    <CardDescription>Campaign interactions</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex items-center justify-center">
                      <ProgressCircle value={78} size={120} strokeWidth={10} />
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Previous</p>
                        <p className="font-medium">64%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Change</p>
                        <p className="font-medium text-green-500">+14%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Content Performance</CardTitle>
                    <CardDescription>Effectiveness score</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex items-center justify-center">
                      <ProgressCircle value={84} size={120} strokeWidth={10} />
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Previous</p>
                        <p className="font-medium">79%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Change</p>
                        <p className="font-medium text-green-500">+5%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Campaign ROI</CardTitle>
                    <CardDescription>Return on investment</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex items-center justify-center">
                      <ProgressCircle value={92} size={120} strokeWidth={10} />
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Previous</p>
                        <p className="font-medium">87%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Change</p>
                        <p className="font-medium text-green-500">+5%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">HCP Sentiment</CardTitle>
                    <CardDescription>Positive feedback</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex items-center justify-center">
                      <ProgressCircle value={63} size={120} strokeWidth={10} />
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Previous</p>
                        <p className="font-medium">58%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Change</p>
                        <p className="font-medium text-green-500">+5%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="engagement">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Distribution</CardTitle>
                  <CardDescription>Analysis by healthcare specialty and content type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
                    <div className="text-center">
                      <span className="material-icons text-primary text-4xl mb-2">assessment</span>
                      <h3 className="text-lg font-medium mb-1">Visualization placeholder</h3>
                      <p className="text-sm text-muted-foreground">
                        Engagement breakdown would display here with interactive charts
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DecisionDriver;