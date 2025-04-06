import { useLocation } from "wouter";
import DashboardHeader from "@/components/dashboard-header";
import StatsCard from "@/components/stats-card";
import QuickAccessCard from "@/components/quick-access-card";
import { useAppContext } from "@/contexts/app-context";

const Dashboard = () => {
  const [, setLocation] = useLocation();
  const { toggleMobileMenu, isMobileMenuOpen } = useAppContext();

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
    <div className="h-screen flex flex-col bg-background">
      <main className="flex-1 overflow-y-auto bg-background-dark">
        <DashboardHeader 
          title="Dashboard" 
          onMobileMenuToggle={toggleMobileMenu}
          showMobileMenu={isMobileMenuOpen}
        />
        
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
          
          {/* Recent Activity */}
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="hidden md:table-header-group">
                    <tr className="border-b border-gray-800">
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Activity</th>
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">User</th>
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Date</th>
                      <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Desktop view rows */}
                    <tr className="border-b border-gray-800 hover:bg-background-lighter hidden md:table-row">
                      <td className="py-3 px-4">Campaign "Q2 Cardiology" created</td>
                      <td className="py-3 px-4">John Doe</td>
                      <td className="py-3 px-4 text-sm text-gray-400">Today, 10:45 AM</td>
                      <td className="py-3 px-4"><span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">Completed</span></td>
                    </tr>
                    <tr className="border-b border-gray-800 hover:bg-background-lighter hidden md:table-row">
                      <td className="py-3 px-4">25 HCPs tagged in MediTag Engine</td>
                      <td className="py-3 px-4">Sarah Johnson</td>
                      <td className="py-3 px-4 text-sm text-gray-400">Yesterday, 3:20 PM</td>
                      <td className="py-3 px-4"><span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">Completed</span></td>
                    </tr>
                    <tr className="border-b border-gray-800 hover:bg-background-lighter hidden md:table-row">
                      <td className="py-3 px-4">Content batch generated for oncologists</td>
                      <td className="py-3 px-4">Mike Reynolds</td>
                      <td className="py-3 px-4 text-sm text-gray-400">Yesterday, 11:30 AM</td>
                      <td className="py-3 px-4"><span className="bg-yellow-900/30 text-yellow-400 text-xs px-2 py-1 rounded">Review</span></td>
                    </tr>
                    <tr className="hover:bg-background-lighter hidden md:table-row">
                      <td className="py-3 px-4">CSV HCP data imported</td>
                      <td className="py-3 px-4">John Doe</td>
                      <td className="py-3 px-4 text-sm text-gray-400">Apr 5, 2023</td>
                      <td className="py-3 px-4"><span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">Completed</span></td>
                    </tr>
                    
                    {/* Mobile view cards */}
                    <tr className="md:hidden block border-b border-gray-800 p-4 my-2 rounded bg-background-lighter">
                      <td className="block py-1">
                        <div className="font-medium">Campaign "Q2 Cardiology" created</div>
                        <div className="text-sm text-gray-400 mt-1">John Doe • Today, 10:45 AM</div>
                        <div className="mt-2"><span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">Completed</span></div>
                      </td>
                    </tr>
                    <tr className="md:hidden block border-b border-gray-800 p-4 my-2 rounded bg-background-lighter">
                      <td className="block py-1">
                        <div className="font-medium">25 HCPs tagged in MediTag Engine</div>
                        <div className="text-sm text-gray-400 mt-1">Sarah Johnson • Yesterday, 3:20 PM</div>
                        <div className="mt-2"><span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">Completed</span></div>
                      </td>
                    </tr>
                    <tr className="md:hidden block border-b border-gray-800 p-4 my-2 rounded bg-background-lighter">
                      <td className="block py-1">
                        <div className="font-medium">Content batch generated for oncologists</div>
                        <div className="text-sm text-gray-400 mt-1">Mike Reynolds • Yesterday, 11:30 AM</div>
                        <div className="mt-2"><span className="bg-yellow-900/30 text-yellow-400 text-xs px-2 py-1 rounded">Review</span></div>
                      </td>
                    </tr>
                    <tr className="md:hidden block border-b border-gray-800 p-4 my-2 rounded bg-background-lighter">
                      <td className="block py-1">
                        <div className="font-medium">CSV HCP data imported</div>
                        <div className="text-sm text-gray-400 mt-1">John Doe • Apr 5, 2023</div>
                        <div className="mt-2"><span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">Completed</span></div>
                      </td>
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
