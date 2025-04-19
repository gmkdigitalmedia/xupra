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
import { toast } from "@/hooks/use-toast";

const DecisionDriver = () => {
  const [reportType, setReportType] = useState("campaign");
  const [timeFrame, setTimeFrame] = useState("last30");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<{
    id: number;
    type: string;
    timeFrame: string;
    date: string;
  } | null>(null);

  const handleGenerateReport = (type = reportType, time = timeFrame) => {
    // Update the UI state to show generating
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Create a report object
      const report = {
        id: Date.now(),
        type,
        timeFrame: time,
        date: new Date().toLocaleDateString()
      };
      
      // Update state and stop loading
      setGeneratedReport(report);
      setIsGenerating(false);
      
      // Show success notification
      toast({
        title: "Report Generated",
        description: `Your ${getReportName(type)} report has been created and is ready to download.`,
      });
    }, 2000);
  };
  
  const getReportName = (type: string) => {
    switch (type) {
      case 'campaign': return 'Campaign Performance';
      case 'hcp': return 'HCP Engagement';
      case 'roi': return 'ROI Analysis';
      case 'market': return 'Market Trends';
      case 'engagement': return 'Engagement Insights';
      default: return 'Custom Report';
    }
  };
  
  const getTimeFrameName = (timeFrame: string) => {
    switch (timeFrame) {
      case 'last7': return 'Last 7 Days';
      case 'last30': return 'Last 30 Days';
      case 'last90': return 'Last 90 Days';
      case 'thisyear': return 'This Year';
      case 'custom': return 'Custom Range';
      default: return 'Custom';
    }
  };
  
  const handleQuickReportGeneration = (reportName: string) => {
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
      {/* Main content area - add md:ml-64 to push content away from sidebar on medium screens and up */}
      <div className="flex-1 overflow-auto md:ml-64">
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
                        <SelectItem value="hcp">HCP Engagement</SelectItem>
                        <SelectItem value="roi">ROI Analysis</SelectItem>
                        <SelectItem value="market">Market Trends</SelectItem>
                        <SelectItem value="engagement">Engagement Insights</SelectItem>
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
                
                <Button 
                  className="w-full"
                  disabled={isGenerating}
                  onClick={() => handleGenerateReport()}
                >
                  {isGenerating ? (
                    <>
                      <span className="material-icons animate-spin mr-2">autorenew</span>
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <span className="material-icons mr-2">analytics</span>
                      Generate Report
                    </>
                  )}
                </Button>
                
                {generatedReport && (
                  <div className="mt-4 p-4 border rounded-lg bg-background-lighter">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Generated Report</h3>
                      <Badge variant="outline">{generatedReport.date}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {getReportName(generatedReport.type)} ({getTimeFrameName(generatedReport.timeFrame)})
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <span className="material-icons text-sm mr-1">visibility</span>
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <span className="material-icons text-sm mr-1">file_download</span>
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <span className="material-icons text-sm mr-1">share</span>
                        Share
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Metrics</CardTitle>
                <CardDescription>Performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Campaign Effectiveness</span>
                      <span className="text-sm text-muted-foreground">82%</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">HCP Engagement</span>
                      <span className="text-sm text-muted-foreground">68%</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">ROI Score</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex flex-col items-center">
                      <ProgressCircle value={92} size={80} strokeWidth={8} />
                      <span className="text-sm font-medium mt-2">Data Quality</span>
                      <span className="text-xs text-muted-foreground">92%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ProgressCircle value={78} size={80} strokeWidth={8} />
                      <span className="text-sm font-medium mt-2">AI Confidence</span>
                      <span className="text-xs text-muted-foreground">78%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-xl font-bold mt-4">Quick Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleQuickReportGeneration('monthly')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Monthly Performance</CardTitle>
                <CardDescription className="text-xs">Campaign overview for last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="material-icons text-primary text-3xl">insert_chart</span>
                  <Button size="sm" variant="secondary" disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleQuickReportGeneration('hcp')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">HCP Engagement</CardTitle>
                <CardDescription className="text-xs">Detailed 90-day HCP analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="material-icons text-primary text-3xl">groups</span>
                  <Button size="sm" variant="secondary" disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleQuickReportGeneration('roi')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">ROI Analysis</CardTitle>
                <CardDescription className="text-xs">Financial impact assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="material-icons text-primary text-3xl">paid</span>
                  <Button size="sm" variant="secondary" disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleQuickReportGeneration('executive')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Executive Summary</CardTitle>
                <CardDescription className="text-xs">High-level overview for leadership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="material-icons text-primary text-3xl">assistant</span>
                  <Button size="sm" variant="secondary" disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Strategic Recommendations</CardTitle>
                <CardDescription>AI-powered insights based on your data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-background-lighter">
                    <div className="mt-0.5 bg-primary/20 p-2 rounded-full">
                      <span className="material-icons text-primary text-sm">lightbulb</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Optimize Content Strategy</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        HCPs are engaging 43% more with clinical case studies than general product information. 
                        Consider reallocating resources to create more case-based content.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-background-lighter">
                    <div className="mt-0.5 bg-primary/20 p-2 rounded-full">
                      <span className="material-icons text-primary text-sm">schedule</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Engagement Timing</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Data indicates Tuesday and Thursday mornings (8-10 AM) show 27% higher HCP response rates. 
                        Consider scheduling important communications during these windows.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-background-lighter">
                    <div className="mt-0.5 bg-primary/20 p-2 rounded-full">
                      <span className="material-icons text-primary text-sm">public</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Regional Focus</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Engagement is 35% below target in the Kansai region. 
                        Consider a targeted campaign addressing specific needs in this area.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Reports</CardTitle>
                <CardDescription>Access your latest insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 hover:bg-background-lighter rounded-md transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <span className="material-icons text-primary text-sm">description</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Q1 Campaign Performance</h4>
                        <p className="text-xs text-muted-foreground">Generated April 15, 2025</p>
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <span className="material-icons text-sm">download</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Download Report</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 hover:bg-background-lighter rounded-md transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <span className="material-icons text-primary text-sm">description</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">HCP Engagement Analysis</h4>
                        <p className="text-xs text-muted-foreground">Generated April 10, 2025</p>
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <span className="material-icons text-sm">download</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Download Report</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 hover:bg-background-lighter rounded-md transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <span className="material-icons text-primary text-sm">description</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">ROI Assessment</h4>
                        <p className="text-xs text-muted-foreground">Generated April 5, 2025</p>
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <span className="material-icons text-sm">download</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Download Report</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 hover:bg-background-lighter rounded-md transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <span className="material-icons text-primary text-sm">description</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Executive Summary</h4>
                        <p className="text-xs text-muted-foreground">Generated March 30, 2025</p>
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <span className="material-icons text-sm">download</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Download Report</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <span className="material-icons mr-2 text-sm">history</span>
                  View All Reports
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionDriver;