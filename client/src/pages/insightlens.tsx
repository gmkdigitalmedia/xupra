import { useState } from "react";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboard-header";

const InsightLens = () => {
  const [selectedCampaign, setSelectedCampaign] = useState("");
  
  const handleCampaignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCampaign(e.target.value);
  };

  const keyMetrics = [
    { label: "Open Rate", value: "78%", target: "65%" },
    { label: "Response Rate", value: "36%", target: "25%" },
    { label: "ROI", value: "3.2x", target: "2.5x" },
  ];

  const aiInsights = [
    "Cardiologists showed 28% higher engagement with clinical trial data vs. general product information.",
    "Tuesday morning emails had 34% higher open rates than other days/times.",
    "HCPs who received personalized content were 2.1x more likely to schedule follow-up meetings.",
    "Content focusing on patient outcomes resonated better with 'Patient-Focused' tagged HCPs.",
    "Compliance-flagged content had 18% lower engagement rates."
  ];

  const recommendations = [
    "Increase frequency of clinical data updates for Evidence-Driven HCPs.",
    "Schedule email sends for Tuesday/Thursday mornings to maximize open rates.",
    "Develop more personalized content for high-value HCP segments.",
    "Focus on patient outcome messaging for Patient-Focused segment.",
    "Address regulatory compliance flags before campaign launch."
  ];

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-background-dark">
        <DashboardHeader title="InsightLens" />
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">InsightLens</h2>
            <p className="text-gray-400">Analyze campaign performance and gain actionable insights</p>
          </div>
          
          {/* Campaign Selection */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-semibold mb-4 md:mb-0">Campaign Analysis</h3>
              <div className="w-full md:w-72">
                <select 
                  className="w-full bg-background-dark text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-primary"
                  value={selectedCampaign}
                  onChange={handleCampaignChange}
                >
                  <option value="">Select a campaign</option>
                  <option value="cardiox_q2">Q2 Cardiology Engagement</option>
                  <option value="oncology_launch">Oncology New Product Launch</option>
                  <option value="pediatric_series">Pediatrician Educational Series</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="bg-background-card rounded-xl shadow-lg p-6">
                <h3 className="text-sm text-gray-400 mb-1">{metric.label}</h3>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-bold">{metric.value}</span>
                  <span className="text-sm text-green-400">vs {metric.target} target</span>
                </div>
                <div className="mt-4 h-2 bg-background-dark rounded-full">
                  <div 
                    className="h-2 bg-primary rounded-full" 
                    style={{ width: `${parseInt(metric.value) + 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Performance Chart */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Campaign Performance</h3>
                <div className="flex space-x-4">
                  <span className="text-sm text-gray-400">Q2 2023</span>
                  <select className="bg-background-dark text-white text-sm rounded-lg px-2 py-1 border border-gray-700">
                    <option>Last 30 days</option>
                    <option>Last quarter</option>
                    <option>Last year</option>
                  </select>
                </div>
              </div>
              
              <div className="h-60 w-full bg-background-lighter rounded-lg flex items-center justify-center">
                <div className="w-full p-4">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-2xl font-bold">78%</h4>
                      <p className="text-xs text-gray-400">Open Rate</p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">36%</h4>
                      <p className="text-xs text-gray-400">Response Rate</p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">3.2x</h4>
                      <p className="text-xs text-gray-400">ROI</p>
                    </div>
                  </div>
                  
                  <div className="relative h-24 w-full">
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-700"></div>
                    <div className="absolute bottom-0 left-0 h-16 w-8 bg-primary/20"></div>
                    <div className="absolute bottom-0 left-0 h-12 w-8 bg-primary"></div>
                    
                    <div className="absolute bottom-0 left-[calc(12.5%)] h-20 w-8 bg-primary/20"></div>
                    <div className="absolute bottom-0 left-[calc(12.5%)] h-14 w-8 bg-primary"></div>
                    
                    <div className="absolute bottom-0 left-[calc(25%)] h-24 w-8 bg-primary/20"></div>
                    <div className="absolute bottom-0 left-[calc(25%)] h-18 w-8 bg-primary"></div>
                    
                    <div className="absolute bottom-0 left-[calc(37.5%)] h-20 w-8 bg-primary/20"></div>
                    <div className="absolute bottom-0 left-[calc(37.5%)] h-16 w-8 bg-primary"></div>
                    
                    <div className="absolute bottom-0 left-[calc(50%)] h-18 w-8 bg-primary/20"></div>
                    <div className="absolute bottom-0 left-[calc(50%)] h-12 w-8 bg-primary"></div>
                    
                    <div className="absolute bottom-0 left-[calc(62.5%)] h-22 w-8 bg-primary/20"></div>
                    <div className="absolute bottom-0 left-[calc(62.5%)] h-18 w-8 bg-primary"></div>
                    
                    <div className="absolute bottom-0 left-[calc(75%)] h-24 w-8 bg-primary/20"></div>
                    <div className="absolute bottom-0 left-[calc(75%)] h-20 w-8 bg-primary"></div>
                    
                    <div className="absolute bottom-0 left-[calc(87.5%)] h-20 w-8 bg-primary/20"></div>
                    <div className="absolute bottom-0 left-[calc(87.5%)] h-16 w-8 bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Insights and Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-background-card rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="material-icons text-primary">lightbulb</span>
                  <h3 className="font-semibold">AI Insights</h3>
                </div>
                <ul className="space-y-3">
                  {aiInsights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="material-icons text-primary text-sm mr-2 mt-1">arrow_right</span>
                      <span className="text-sm">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-background-card rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="material-icons text-primary">tips_and_updates</span>
                  <h3 className="font-semibold">Recommendations</h3>
                </div>
                <ul className="space-y-3">
                  {recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="material-icons text-green-400 text-sm mr-2 mt-1">check_circle</span>
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Segment Comparison */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="font-semibold mb-4">Segment Comparison</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-background-lighter">
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">HCP Segment</th>
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Open Rate</th>
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Response Rate</th>
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Avg. Engagement</th>
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800 hover:bg-background-lighter">
                      <td className="py-3 px-4">Early Adopters</td>
                      <td className="py-3 px-4 text-green-400">84%</td>
                      <td className="py-3 px-4 text-green-400">42%</td>
                      <td className="py-3 px-4 text-green-400">7.8/10</td>
                      <td className="py-3 px-4 text-green-400">3.8x</td>
                    </tr>
                    <tr className="border-b border-gray-800 hover:bg-background-lighter">
                      <td className="py-3 px-4">Evidence Driven</td>
                      <td className="py-3 px-4 text-green-400">76%</td>
                      <td className="py-3 px-4">35%</td>
                      <td className="py-3 px-4">6.9/10</td>
                      <td className="py-3 px-4">3.1x</td>
                    </tr>
                    <tr className="border-b border-gray-800 hover:bg-background-lighter">
                      <td className="py-3 px-4">Patient Focused</td>
                      <td className="py-3 px-4">72%</td>
                      <td className="py-3 px-4">32%</td>
                      <td className="py-3 px-4">6.2/10</td>
                      <td className="py-3 px-4">2.7x</td>
                    </tr>
                    <tr className="hover:bg-background-lighter">
                      <td className="py-3 px-4">Balanced</td>
                      <td className="py-3 px-4 text-yellow-400">65%</td>
                      <td className="py-3 px-4 text-yellow-400">28%</td>
                      <td className="py-3 px-4 text-yellow-400">5.8/10</td>
                      <td className="py-3 px-4 text-yellow-400">2.4x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InsightLens;
