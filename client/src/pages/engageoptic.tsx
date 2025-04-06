import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboard-header";
import TagBadge from "@/components/tag-badge";

// Improved dropdown component
const CustomSelect = ({ 
  label, 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option" 
}: { 
  label: string; 
  options: { value: string; label: string }[]; 
  value: string; 
  onChange: (value: string) => void; 
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(placeholder);

  // Update the displayed label when value changes
  useEffect(() => {
    const option = options.find(opt => opt.value === value);
    setSelectedLabel(option ? option.label : placeholder);
  }, [value, options, placeholder]);

  const handleSelect = (optionValue: string, optionLabel: string) => {
    onChange(optionValue);
    setSelectedLabel(optionLabel);
    setIsOpen(false);
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div 
        className="w-full text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-primary cursor-pointer flex items-center justify-between"
        style={{ backgroundColor: "#1e1e1e" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white" : "text-gray-500"}>
          {selectedLabel}
        </span>
        <span className="material-icons text-sm">
          {isOpen ? "arrow_drop_up" : "arrow_drop_down"}
        </span>
      </div>
      
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-hidden">
          <div className="overflow-y-auto" style={{ backgroundColor: "#1e1e1e" }}>
            {options.map((option) => (
              <div 
                key={option.value} 
                style={{ 
                  backgroundColor: option.value === value ? "#2c3e62" : "#1e1e1e",
                  borderLeft: option.value === value ? "4px solid #3b82f6" : "none"
                }}
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleSelect(option.value, option.label)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const EngageOptic = () => {
  const [selectedHcp, setSelectedHcp] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [planGenerated, setPlanGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<null | {
    targetAudience: string;
    content: string;
    recommendedChannels: {
      email: number;
      video: number;
      inPerson: number;
      webinar: number;
      call: number;
    };
    optimalTiming: string;
    followUpStrategy: string;
  }>(null);
  
  const handleGenerateCampaignPlan = () => {
    if (!selectedHcp || !selectedContent) {
      // Show visual feedback that selections are required
      return;
    }
    
    // In a real implementation, this would make an API call to generate a campaign plan
    setIsGenerating(true);
    setPlanGenerated(false);
    
    // Get HCP segment name for display
    const hcpName = hcpOptions.find(opt => opt.value === selectedHcp)?.label || "";
    const contentName = contentOptions.find(opt => opt.value === selectedContent)?.label || "";
    
    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
      setPlanGenerated(true);
      
      // Generate a simulated campaign plan
      const plan = {
        targetAudience: hcpName,
        content: contentName,
        recommendedChannels: {
          email: selectedHcp === "cardiologists" ? 42 : selectedHcp === "oncologists" ? 38 : 35,
          video: selectedHcp === "neurologists" ? 32 : 21,
          inPerson: selectedHcp === "oncologists" ? 35 : 31,
          webinar: selectedHcp === "cardiologists" ? 18 : 13,
          call: selectedHcp === "pediatricians" ? 25 : 10
        },
        optimalTiming: selectedHcp === "cardiologists" 
          ? "Tuesday/Thursday mornings (8-10 AM)" 
          : selectedHcp === "oncologists"
            ? "Monday/Wednesday afternoons (2-4 PM)"
            : "Weekday mornings (9-11 AM)",
        followUpStrategy: selectedHcp === "cardiologists"
          ? "3-5 days after initial contact"
          : selectedHcp === "oncologists"
            ? "1 week after initial engagement"
            : "48-72 hours after initial outreach"
      };
      
      setGeneratedPlan(plan);
      
      console.log("Generating campaign plan for:", {
        hcp: selectedHcp,
        content: selectedContent,
        plan
      });
    }, 1500);
  };
  
  const hcpOptions = [
    { value: "", label: "Select HCP segment" },
    { value: "cardiologists", label: "Cardiologists" },
    { value: "oncologists", label: "Oncologists" },
    { value: "neurologists", label: "Neurologists" },
    { value: "generalpractitioners", label: "General Practitioners" },
    { value: "pediatricians", label: "Pediatricians" },
  ];
  
  const contentOptions = [
    { value: "", label: "Select content" },
    { value: "cardiox_update", label: "CardioX Clinical Trial Update" },
    { value: "immunoplus_indication", label: "ImmunoPlus New Indication" },
    { value: "neurocare_resources", label: "NeuroCare Patient Resources" },
    { value: "diabeshield_launch", label: "DiabeShield Product Launch" },
    { value: "respireclear_study", label: "RespireClear Clinical Study" },
  ];
  
  const [channelOptions, setChannelOptions] = useState([
    { id: 1, label: "Email", active: true },
    { id: 2, label: "Video", active: false },
    { id: 3, label: "In-person", active: false },
    { id: 4, label: "Webinar", active: false },
    { id: 5, label: "Call", active: false },
  ]);
  
  const toggleChannel = (id: number) => {
    setChannelOptions(options => 
      options.map(option => 
        option.id === id ? { ...option, active: !option.active } : option
      )
    );
  };
  
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
                  <CustomSelect 
                    label="Select HCP Segment"
                    options={hcpOptions}
                    value={selectedHcp}
                    onChange={setSelectedHcp}
                  />
                  
                  <CustomSelect 
                    label="Select Content"
                    options={contentOptions}
                    value={selectedContent}
                    onChange={setSelectedContent}
                  />
                  
                  {planGenerated && (
                    <div className="mb-4 p-2 bg-green-900/30 text-green-400 rounded-lg text-sm">
                      <span className="material-icons text-sm mr-1 align-text-bottom">check_circle</span>
                      Campaign plan generated successfully!
                    </div>
                  )}
                  
                  <button 
                    className={`w-full font-medium px-4 py-2 rounded-lg transition mt-4 flex items-center justify-center ${
                      !selectedHcp || !selectedContent 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : isGenerating 
                          ? 'bg-primary/70 text-white'
                          : 'bg-primary hover:bg-primary/80 text-white'
                    }`}
                    onClick={handleGenerateCampaignPlan}
                    disabled={!selectedHcp || !selectedContent || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      'Generate Campaign Plan'
                    )}
                  </button>
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Channel Optimization</label>
                  <div className="bg-background-dark rounded-lg border border-gray-700 p-4 h-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-medium">Recommended Channels</h4>
                      <span className="text-sm text-gray-400">
                        {generatedPlan ? generatedPlan.targetAudience : "Select HCP segment to view recommendations"}
                      </span>
                    </div>
                    
                    {generatedPlan ? (
                      <div className="grid grid-cols-5 gap-4 w-full px-4">
                        <div className="flex flex-col items-center justify-end h-48">
                          <div className="bg-primary w-8 rounded-t-lg" style={{height: `${generatedPlan.recommendedChannels.email * 2}px`}}></div>
                          <span className="text-xs mt-2">Email</span>
                          <span className="text-xs text-gray-400">{generatedPlan.recommendedChannels.email}%</span>
                        </div>
                        <div className="flex flex-col items-center justify-end h-48">
                          <div className="bg-blue-400 w-8 rounded-t-lg" style={{height: `${generatedPlan.recommendedChannels.video * 2}px`}}></div>
                          <span className="text-xs mt-2">Video</span>
                          <span className="text-xs text-gray-400">{generatedPlan.recommendedChannels.video}%</span>
                        </div>
                        <div className="flex flex-col items-center justify-end h-48">
                          <div className="bg-indigo-400 w-8 rounded-t-lg" style={{height: `${generatedPlan.recommendedChannels.inPerson * 2}px`}}></div>
                          <span className="text-xs mt-2">In-person</span>
                          <span className="text-xs text-gray-400">{generatedPlan.recommendedChannels.inPerson}%</span>
                        </div>
                        <div className="flex flex-col items-center justify-end h-48">
                          <div className="bg-purple-400 w-8 rounded-t-lg" style={{height: `${generatedPlan.recommendedChannels.webinar * 2}px`}}></div>
                          <span className="text-xs mt-2">Webinar</span>
                          <span className="text-xs text-gray-400">{generatedPlan.recommendedChannels.webinar}%</span>
                        </div>
                        <div className="flex flex-col items-center justify-end h-48">
                          <div className="bg-pink-400 w-8 rounded-t-lg" style={{height: `${generatedPlan.recommendedChannels.call * 2}px`}}></div>
                          <span className="text-xs mt-2">Call</span>
                          <span className="text-xs text-gray-400">{generatedPlan.recommendedChannels.call}%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                        Select HCP segment and content, then generate a campaign plan to see channel recommendations
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Timing Recommendations</label>
                    <div className="bg-background-dark rounded-lg border border-gray-700 p-4">
                      {generatedPlan ? (
                        <>
                          <p className="text-sm mb-2">
                            <span className="font-medium">Optimal Send Time:</span> {generatedPlan.optimalTiming}
                          </p>
                          <p className="text-sm mb-2">
                            <span className="font-medium">Optimal Follow-up:</span> {generatedPlan.followUpStrategy}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Content:</span> {generatedPlan.content}
                          </p>
                          <p className="text-sm mt-2 text-gray-400">
                            <span className="italic">Analysis based on historical engagement patterns for {generatedPlan.targetAudience.toLowerCase()}</span>
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-400">
                          Generate a campaign plan to see timing recommendations
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Channel Selection */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Channel Selection</h3>
              <div className="text-sm text-gray-400">
                {channelOptions.filter(c => c.active).length} channels selected
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">Click to select or deselect channels for your campaign</p>
            <div className="flex flex-wrap gap-3">
              {channelOptions.map((channel) => (
                <TagBadge 
                  key={channel.id}
                  label={channel.label} 
                  color={channel.active ? "primary" : undefined} 
                  active={channel.active}
                  onClick={() => toggleChannel(channel.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Campaign List */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="font-semibold">Campaign List</h3>
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
                      <td className="py-3 px-4">{campaign.name}</td>
                      <td className="py-3 px-4">{campaign.target}</td>
                      <td className="py-3 px-4">{campaign.channels}</td>
                      <td className="py-3 px-4">{campaign.startDate}</td>
                      <td className="py-3 px-4">{campaign.endDate}</td>
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

export default EngageOptic;
