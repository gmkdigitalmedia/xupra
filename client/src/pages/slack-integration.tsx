import { useLocation } from "wouter";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { SlackIntegration } from "@/components/slack-integration";

export default function SlackIntegrationPage() {
  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-background-dark md:ml-64 p-4">
        <DashboardHeader title="Slack Integration" />
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Connect with Your Team</h2>
          <p className="text-gray-500">
            Send messages and share HCP engagement and campaign analytics directly to Slack
          </p>
        </div>
        
        <SlackIntegration />
      </div>
    </div>
  );
}