import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import MediTag from "@/pages/meditag";
import ContentCraft from "@/pages/contentcraft";
import EngageOptic from "@/pages/engageoptic";
import InsightLens from "@/pages/insightlens";
import AssetManagement from "@/pages/asset-management";
import AdminConnectionsPage from "@/pages/admin";
import SlackIntegrationPage from "@/pages/slack-integration";
import { useAppContext, AppProvider } from "./contexts/app-context";
import Sidebar from "./components/sidebar";
import { useEffect } from "react";

function AppRoutes() {
  const { isLoggedIn, isMobileMenuOpen, closeMobileMenu, toggleMobileMenu } = useAppContext();
  
  // Close mobile menu on navigation
  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    
    // Add listener for pathname changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Clean up
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  if (!isLoggedIn) {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 md:hidden" onClick={closeMobileMenu}>
          <div className="w-4/5 max-w-xs h-full bg-background" onClick={(e) => e.stopPropagation()}>
            <Sidebar closeMobileMenu={closeMobileMenu} />
          </div>
        </div>
      )}
      
      {/* Desktop sidebar - always visible on larger screens */}
      <div className="hidden md:block md:flex-shrink-0">
        <Sidebar closeMobileMenu={closeMobileMenu} />
      </div>
      
      {/* Main content */}
      <div className="flex-grow">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/meditag" component={MediTag} />
          <Route path="/contentcraft" component={ContentCraft} />
          <Route path="/engageoptic" component={EngageOptic} />
          <Route path="/insightlens" component={InsightLens} />
          <Route path="/asset-management" component={AssetManagement} />
          <Route path="/admin" component={AdminConnectionsPage} />
          <Route path="/slack-integration" component={SlackIntegrationPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppRoutes />
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
