import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboard-header";
import TagBadge from "@/components/tag-badge";

const EngageOpticNew = () => {
  // State for segment and content selection
  const [selectedHcp, setSelectedHcp] = useState<string>("");
  const [selectedContent, setSelectedContent] = useState<string>("");
  const [generatingPlan, setGeneratingPlan] = useState<boolean>(false);
  const [campaignPlan, setCampaignPlan] = useState<CampaignPlan | null>(null);
  
  // Reset campaign plan when selections change
  useEffect(() => {
    setCampaignPlan(null);
  }, [selectedHcp, selectedContent]);

  // Mock API call for generating campaign plan
  const handleGenerateCampaignPlan = () => {
    if (!selectedHcp || !selectedContent) {
      alert("Please select both an HCP segment and content type");
      return;
    }
    
    setGeneratingPlan(true);
    console.log("Generating campaign plan for:", {
      hcp: selectedHcp,
      content: selectedContent,
    });
    
    // Simulate API call with timeout
    setTimeout(() => {
      const hcpSegmentName = getHcpDisplayName(selectedHcp);
      const contentName = getContentDisplayName(selectedContent);
      
      // Generate a plan based on the selection
      setCampaignPlan({
        title: `${hcpSegmentName} Engagement: ${contentName}`,
        hcpSegment: hcpSegmentName,
        content: contentName,
        channels: [
          { name: "Email", percentage: selectedHcp === "cardiologists" ? 42 : selectedHcp === "oncologists" ? 35 : 38 },
          { name: "Video", percentage: selectedHcp === "cardiologists" ? 21 : selectedHcp === "oncologists" ? 28 : 22 },
          { name: "In-person", percentage: selectedHcp === "cardiologists" ? 31 : selectedHcp === "oncologists" ? 25 : 15 },
          { name: "Webinar", percentage: selectedHcp === "cardiologists" ? 13 : selectedHcp === "oncologists" ? 18 : 20 },
          { name: "Call", percentage: selectedHcp === "cardiologists" ? 10 : selectedHcp === "oncologists" ? 7 : 12 }
        ],
        timingRecommendations: {
          optimalSendTime: selectedHcp === "cardiologists" ? "Tuesday/Thursday mornings (8-10 AM)" : 
                           selectedHcp === "oncologists" ? "Monday/Wednesday afternoons (1-3 PM)" : 
                           "Tuesday/Friday mornings (9-11 AM)",
          optimalFollowUp: selectedHcp === "cardiologists" ? "3-5 days after initial contact" : 
                           selectedHcp === "oncologists" ? "5-7 days after initial contact" : 
                           "2-4 days after initial contact",
          reasoning: selectedHcp === "cardiologists" 
            ? "Analysis of previous engagement patterns shows cardiologists have 32% higher response rates during early morning hours and are 2.7x more likely to engage with content on Tuesday/Thursday."
            : selectedHcp === "oncologists"
            ? "Historical data indicates oncologists prefer afternoon content review with 41% higher engagement rates compared to mornings. Monday and Wednesday show best response patterns."
            : "Based on engagement data, this segment responds best to morning communications with quick follow-up timing for maximum effectiveness."
        }
      });
      
      setGeneratingPlan(false);
    }, 1500);
  };

  // Helper functions to get display names
  const getHcpDisplayName = (value: string): string => {
    switch(value) {
      case "cardiologists": return "Cardiologists";
      case "oncologists": return "Oncologists";
      case "neurologists": return "Neurologists";
      case "generalpractitioners": return "General Practitioners";
      case "pediatricians": return "Pediatricians";
      default: return value;
    }
  };

  const getContentDisplayName = (value: string): string => {
    switch(value) {
      case "cardiox_update": return "CardioX Clinical Trial Update";
      case "immunoplus_indication": return "ImmunoPlus New Indication";
      case "neurocare_resources": return "NeuroCare Patient Resources";
      case "diabeshield_launch": return "DiabeShield Product Launch";
      case "respireclear_study": return "RespireClear Clinical Study";
      default: return value;
    }
  };

  // Mock data for channel options and campaigns list
  const channelOptions = [
    { label: "Email", active: true },
    { label: "Video", active: false },
    { label: "In-person", active: false },
    { label: "Webinar", active: false },
    { label: "Call", active: false },
  ];
  
  const campaigns = [
    {
      name: "Q2 Cardiology Engagement",
      target: "Cardiologists",
      channels: "Email, Meeting",
      startDate: "Apr 10, 2023",
      endDate: "Jun 15, 2023",
      status: "In Progress"
    },
    {
      name: "Oncology New Product Launch",
      target: "Oncologists",
      channels: "Email, Webinar",
      startDate: "May 1, 2023",
      endDate: "Jul 30, 2023",
      status: "Planned"
    },
    {
      name: "Pediatrician Educational Series",
      target: "Pediatricians",
      channels: "Video, Email",
      startDate: "Mar 15, 2023",
      endDate: "Mar 30, 2023",
      status: "Completed"
    }
  ];

  // Color utilities
  const getChannelColor = (index: number): string => {
    const colors = [
      "bg-primary", 
      "bg-blue-400", 
      "bg-indigo-400", 
      "bg-purple-400", 
      "bg-pink-400"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-background-dark">
        <DashboardHeader title="EngageOptic" />
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">EngageOptic</h2>
            <p className="text-gray-400">Optimize your HCP engagement channels and timing</p>
          </div>
          
          {/* Campaign Creation */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Create Campaign Plan</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1">
                  {/* HCP Segment Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-white">Select HCP Segment</label>
                    {selectedHcp ? (
                      <button
                        className="w-full bg-background-dark text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-primary text-left"
                        onClick={() => setSelectedHcp("")}
                      >
                        {getHcpDisplayName(selectedHcp)}
                      </button>
                    ) : (
                      <select
                        className="w-full bg-background-dark text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-primary dark-select"
                        value={selectedHcp}
                        onChange={(e) => setSelectedHcp(e.target.value)}
                      >
                        <option value="">SELECT HCP SEGMENT</option>
                        <option className="text-black" value="cardiologists">Cardiologists</option>
                        <option className="text-black" value="oncologists">Oncologists</option>
                        <option className="text-black" value="neurologists">Neurologists</option>
                        <option className="text-black" value="generalpractitioners">General Practitioners</option>
                        <option className="text-black" value="pediatricians">Pediatricians</option>
                      </select>
                    )}
                  </div>
                  
                  {/* Content Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-white">Select Content</label>
                    {selectedContent ? (
                      <button
                        className="w-full bg-background-dark text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-primary text-left"
                        onClick={() => setSelectedContent("")}
                      >
                        {getContentDisplayName(selectedContent)}
                      </button>
                    ) : (
                      <select
                        className="w-full bg-background-dark text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-primary dark-select"
                        value={selectedContent}
                        onChange={(e) => setSelectedContent(e.target.value)}
                      >
                        <option value="">SELECT CONTENT</option>
                        <option className="text-black" value="cardiox_update">CardioX Clinical Trial Update</option>
                        <option className="text-black" value="immunoplus_indication">ImmunoPlus New Indication</option>
                        <option className="text-black" value="neurocare_resources">NeuroCare Patient Resources</option>
                        <option className="text-black" value="diabeshield_launch">DiabeShield Product Launch</option>
                        <option className="text-black" value="respireclear_study">RespireClear Clinical Study</option>
                      </select>
                    )}
                  </div>
                  
                  {/* Generate Button */}
                  <button
                    className={`w-full ${generatingPlan ? 'bg-primary/60' : 'bg-primary hover:bg-primary/80'} text-white font-medium px-4 py-2 rounded-lg transition mt-4 flex justify-center items-center`}
                    onClick={handleGenerateCampaignPlan}
                    disabled={generatingPlan || !selectedHcp || !selectedContent}
                  >
                    {generatingPlan ? (
                      <>
                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      'Generate Campaign Plan'
                    )}
                  </button>
                </div>
                
                <div className="col-span-2">
                  {/* Channel Optimization */}
                  <label className="block text-sm font-medium mb-2 text-white">Channel Optimization</label>
                  <div className="bg-background-dark rounded-lg border border-gray-700 p-4 h-64">
                    {generatingPlan ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-sm text-gray-400">Generating campaign plan...</p>
                      </div>
                    ) : campaignPlan ? (
                      <>
                        <div className="flex justify-between items-center mb-6">
                          <h4 className="font-medium text-white">Recommended Channels</h4>
                          <span className="text-sm text-gray-400">{campaignPlan.hcpSegment}</span>
                        </div>
                        
                        <div className="grid grid-cols-5 gap-4 w-full px-4">
                          {campaignPlan.channels.map((channel, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                              <div 
                                className={`${getChannelColor(idx)} rounded-t-lg`} 
                                style={{ 
                                  height: `${channel.percentage * 1.6}px`,
                                  width: '24px' 
                                }}
                              ></div>
                              <span className="text-xs mt-2 text-white">{channel.name}</span>
                              <span className="text-xs text-gray-400">{channel.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-gray-400 mb-2">Select an HCP segment and content type</p>
                        <p className="text-gray-500 text-sm">Then click "Generate Campaign Plan" to see channel optimization</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Timing Recommendations */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2 text-white">Timing Recommendations</label>
                    <div className="bg-background-dark rounded-lg border border-gray-700 p-4">
                      {generatingPlan ? (
                        <div className="flex items-center justify-center h-20">
                          <div className="w-6 h-6 border-t-2 border-primary rounded-full animate-spin"></div>
                        </div>
                      ) : campaignPlan ? (
                        <>
                          <p className="text-sm mb-2 text-white">
                            <span className="font-medium">Optimal Send Time:</span> {campaignPlan.timingRecommendations.optimalSendTime}
                          </p>
                          <p className="text-sm mb-2 text-white">
                            <span className="font-medium">Optimal Follow-up:</span> {campaignPlan.timingRecommendations.optimalFollowUp}
                          </p>
                          <p className="text-sm text-white">
                            <span className="font-medium">Reasoning:</span> {campaignPlan.timingRecommendations.reasoning}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-400 text-center py-4">Generate a campaign plan to see timing recommendations</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Channel Selection */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8 p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Channel Selection</h3>
            <div className="flex flex-wrap gap-3">
              {channelOptions.map((channel, index) => (
                <TagBadge 
                  key={index}
                  label={channel.label} 
                  color={channel.active ? "primary" : undefined} 
                  active={channel.active}
                />
              ))}
            </div>
          </div>
          
          {/* Campaign List */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="font-semibold text-white">Campaign List</h3>
              <button className="bg-primary hover:bg-primary/80 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1 transition">
                <span className="material-icons text-sm">add</span>
                <span>New Campaign</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-background-lighter">
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Campaign Name</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Target HCPs</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Channels</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Start Date</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">End Date</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Status</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-background-lighter">
                      <td className="py-3 px-4 text-white">{campaign.name}</td>
                      <td className="py-3 px-4 text-white">{campaign.target}</td>
                      <td className="py-3 px-4 text-white">{campaign.channels}</td>
                      <td className="py-3 px-4 text-white">{campaign.startDate}</td>
                      <td className="py-3 px-4 text-white">{campaign.endDate}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          campaign.status === 'Completed' 
                            ? 'bg-green-900/30 text-green-400' 
                            : campaign.status === 'In Progress'
                              ? 'bg-blue-900/30 text-blue-400'
                              : 'bg-yellow-900/30 text-yellow-400'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:text-primary/80 mr-2">
                          <span className="material-icons text-sm">edit</span>
                        </button>
                        <button className="text-gray-400 hover:text-white mr-2">
                          <span className="material-icons text-sm">visibility</span>
                        </button>
                        <button className="text-red-500 hover:text-red-400">
                          <span className="material-icons text-sm">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 flex justify-between items-center border-t border-gray-800">
              <p className="text-sm text-gray-400">Showing 3 of 16 campaigns</p>
              <div className="flex space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-background-lighter">
                  <span className="material-icons text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-background-lighter">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-background-lighter">
                  <span className="material-icons text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Types for the component
interface CampaignPlan {
  title: string;
  hcpSegment: string;
  content: string;
  channels: { name: string; percentage: number }[];
  timingRecommendations: {
    optimalSendTime: string;
    optimalFollowUp: string;
    reasoning: string;
  };
}

export default EngageOpticNew;