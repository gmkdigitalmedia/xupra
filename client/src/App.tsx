import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import MediTag from "@/pages/meditag";
import ContentCraft from "@/pages/contentcraft";

import InsightLens from "@/pages/insightlens";
import AssetManagement from "@/pages/asset-management";
import AdminConnectionsPage from "@/pages/admin";
import SlackIntegrationPage from "@/pages/slack-integration";
import InteractCraft from "@/pages/interactcraft";
import DecisionDriver from "@/pages/decisiondriver";
import AboutPage from "@/pages/about";
import MainLayout from "@/components/main-layout";
import { useAppContext, AppProvider } from "./contexts/app-context";
import { MobileMenuProvider } from "./contexts/mobile-menu-context";

function AppRoutes() {
  const { isLoggedIn } = useAppContext();

  return (
    <Switch>
      <Route path="/" component={isLoggedIn ? Dashboard : Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/meditag" component={MediTag} />
      <Route path="/contentcraft" component={ContentCraft} />
      <Route path="/insightlens" component={InsightLens} />
      <Route path="/asset-management" component={AssetManagement} />
      <Route path="/interactcraft" component={InteractCraft} />
      <Route path="/decisiondriver" component={DecisionDriver} />
      <Route path="/admin" component={AdminConnectionsPage} />
      <Route path="/slack-integration" component={SlackIntegrationPage} />
      <Route path="/about" component={AboutPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <MobileMenuProvider>
          <AppRoutes />
          <Toaster />
        </MobileMenuProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
