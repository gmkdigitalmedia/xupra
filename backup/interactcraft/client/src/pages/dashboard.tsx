import { useLocation } from "wouter";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboard-header";
import StatsCard from "@/components/stats-card";
import QuickAccessCard from "@/components/quick-access-card";
import InfluencerNetworkVisualization from "@/components/influencer-network-visualization";

const Dashboard = () => {
  const [, setLocation] = useLocation();

  const statsCards = [
    {
      title: "Total HCPs",
      value: "1,258",
      icon: "people",
      color: "text-blue-500",
      change: {
        value: "12% from last month",
        positive: true
      }
    },
    {
      title: "Active Campaigns",
      value: "16",
      icon: "campaign",
      color: "text-green-500",
      change: {
        value: "3 new this week",
        positive: true
      }
    },
    {
      title: "Engagement Rate",
      value: "68%",
      icon: "thumb_up",
      color: "text-purple-500",
      change: {
        value: "7% increase",
        positive: true
      }
    },
    {
      title: "Content Pieces",
      value: "342",
      icon: "description",
      color: "text-orange-500",
      change: {
        value: "5% compliance review needed",
        positive: false
      }
    }
  ];

  const quickAccessCards = [
    {
      icon: "label",
      title: "MediTag Engine",
      description: "Segment and tag your HCPs",
      path: "/meditag",
      gradientFrom: "primary",
      gradientTo: "blue-500",
      iconColor: "primary"
    },
    {
      icon: "create",
      title: "ContentCraft AI",
      description: "Create personalized content",
      path: "/contentcraft",
      gradientFrom: "purple-500",
      gradientTo: "pink-500",
      iconColor: "purple-500"
    },
    {
      icon: "trending_up",
      title: "EngageOptic",
      description: "Optimize engagement channels",
      path: "/engageoptic",
      gradientFrom: "green-500",
      gradientTo: "teal-500",
      iconColor: "green-500"
    },
    {
      icon: "pie_chart",
      title: "InsightLens",
      description: "Analyze campaign performance",
      path: "/insightlens",
      gradientFrom: "orange-500",
      gradientTo: "red-500",
      iconColor: "orange-500"
    }
  ];

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-background-dark md:ml-64">
        <DashboardHeader title="Dashboard" />
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">Welcome, John</h2>
            <p className="text-gray-400">Here's what's happening with your HCP engagement</p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <StatsCard 
                key={index}
                title={card.title}
                value={card.value}
                icon={card.icon}
                color={card.color}
                change={card.change}
              />
            ))}
          </div>
          
          {/* Quick Access */}
          <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickAccessCards.map((card, index) => (
              <QuickAccessCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                path={card.path}
                gradientFrom={card.gradientFrom}
                gradientTo={card.gradientTo}
                iconColor={card.iconColor}
              />
            ))}
          </div>
          
          {/* Influencer Network Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-7 bg-background-card rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold">Influencer Network</h3>
                <p className="text-sm text-gray-400">Interactive visualization of HCP relationships and influence</p>
              </div>
              <div className="p-4 h-[400px]">
                <InfluencerNetworkVisualization />
              </div>
              <div className="p-4 border-t border-gray-800 bg-background-lighter">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full inline-block mr-2"></span>
                    <span>Key Opinion Leaders</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></span>
                    <span>Collaborators</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block mr-2"></span>
                    <span>Researchers</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full inline-block mr-2"></span>
                    <span>Mentees</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="bg-background-card rounded-xl shadow-lg overflow-hidden h-full">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="text-lg font-semibold">Network Insights</h3>
                  <p className="text-sm text-gray-400">Key metrics and engagement opportunities</p>
                </div>
                <div className="p-4">
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Top Influencers</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">SC</div>
                          <div>
                            <p className="font-medium">Dr. Sarah Chen</p>
                            <p className="text-xs text-gray-400">Cardiology</p>
                          </div>
                        </div>
                        <span className="font-bold text-blue-400">90</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3">JW</div>
                          <div>
                            <p className="font-medium">Dr. James Wilson</p>
                            <p className="text-xs text-gray-400">Oncology</p>
                          </div>
                        </div>
                        <span className="font-bold text-blue-400">85</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mr-3">MR</div>
                          <div>
                            <p className="font-medium">Dr. Maria Rodriguez</p>
                            <p className="text-xs text-gray-400">Neurology</p>
                          </div>
                        </div>
                        <span className="font-bold text-blue-400">80</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Network Statistics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-background-lighter rounded-lg">
                        <p className="text-xs text-gray-400">Network Density</p>
                        <p className="text-xl font-bold">68%</p>
                      </div>
                      <div className="p-3 bg-background-lighter rounded-lg">
                        <p className="text-xs text-gray-400">Average Connections</p>
                        <p className="text-xl font-bold">4.2</p>
                      </div>
                      <div className="p-3 bg-background-lighter rounded-lg">
                        <p className="text-xs text-gray-400">Centrality Score</p>
                        <p className="text-xl font-bold">0.73</p>
                      </div>
                      <div className="p-3 bg-background-lighter rounded-lg">
                        <p className="text-xs text-gray-400">KOL Ratio</p>
                        <p className="text-xl font-bold">1:4</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Activity</th>
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">User</th>
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Date</th>
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800 hover:bg-background-lighter">
                      <td className="py-3 px-4">Campaign "Q2 Cardiology" created</td>
                      <td className="py-3 px-4">John Doe</td>
                      <td className="py-3 px-4 text-sm text-gray-400">Today, 10:45 AM</td>
                      <td className="py-3 px-4"><span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">Completed</span></td>
                    </tr>
                    <tr className="border-b border-gray-800 hover:bg-background-lighter">
                      <td className="py-3 px-4">25 HCPs tagged in MediTag Engine</td>
                      <td className="py-3 px-4">Sarah Johnson</td>
                      <td className="py-3 px-4 text-sm text-gray-400">Yesterday, 3:20 PM</td>
                      <td className="py-3 px-4"><span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">Completed</span></td>
                    </tr>
                    <tr className="border-b border-gray-800 hover:bg-background-lighter">
                      <td className="py-3 px-4">Content batch generated for oncologists</td>
                      <td className="py-3 px-4">Mike Reynolds</td>
                      <td className="py-3 px-4 text-sm text-gray-400">Yesterday, 11:30 AM</td>
                      <td className="py-3 px-4"><span className="bg-yellow-900/30 text-yellow-400 text-xs px-2 py-1 rounded">Review</span></td>
                    </tr>
                    <tr className="hover:bg-background-lighter">
                      <td className="py-3 px-4">CSV HCP data imported</td>
                      <td className="py-3 px-4">John Doe</td>
                      <td className="py-3 px-4 text-sm text-gray-400">Apr 5, 2023</td>
                      <td className="py-3 px-4"><span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">Completed</span></td>
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

export default Dashboard;
