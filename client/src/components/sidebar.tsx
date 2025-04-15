import { useLocation } from "wouter";
import Logo from "./logo";
import { useAppContext } from "@/contexts/app-context";
import { useMobileMenu } from "@/contexts/mobile-menu-context";
import { useEffect, useState } from "react";

const NavItem = ({ 
  icon, 
  label, 
  path, 
  isActive,
  onClick
}: { 
  icon: string; 
  label: string; 
  path: string; 
  isActive: boolean;
  onClick?: () => void;
}) => {
  const [, navigate] = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // First navigate to the path
    navigate(path);
    // Then call the onClick handler if provided (used for closing mobile menu)
    if (onClick) {
      setTimeout(() => {
        onClick();
      }, 10);
    }
  };

  return (
    <li>
      <a 
        href={path}
        onClick={handleClick}
        className={`flex items-center space-x-3 p-3 rounded-lg transition ${
          isActive 
            ? "bg-primary/10 text-primary" 
            : "hover:bg-white/5"
        }`}
      >
        <span className="material-icons">{icon}</span>
        <span>{label}</span>
      </a>
    </li>
  );
};

const Sidebar = () => {
  const [location] = useLocation();
  const { logout } = useAppContext();
  const { isMobileMenuOpen, closeMobileMenu } = useMobileMenu();

  // Create a direct reference to mobile menu state
  const [mounted, setMounted] = useState(false);
  
  // Set mounted to true after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
    { icon: "label", label: "MediTag Engine", path: "/meditag" },
    { icon: "create", label: "ContentCraft AI", path: "/contentcraft" },
    { icon: "trending_up", label: "EngageOptic", path: "/engageoptic" },
    { icon: "pie_chart", label: "InsightLens", path: "/insightlens" },
    { icon: "psychology", label: "InteractCraft AI", path: "/interactcraft" },
    { icon: "auto_graph", label: "DecisionDriver AI", path: "/decisiondriver" },
    { icon: "folder", label: "Asset Management", path: "/asset-management" },
    { icon: "chat", label: "Slack Integration", path: "/slack-integration" },
    { icon: "settings", label: "API Connections", path: "/admin" },
    { icon: "info", label: "About", path: "/about" },
  ];

  // Sidebar CSS classes with proper z-index values
  const sidebarStyles = {
    mobile: {
      open: 'fixed top-0 left-0 z-50 h-screen w-64 bg-black shadow-lg transform transition-transform duration-300 translate-x-0',
      closed: 'fixed top-0 left-0 z-50 h-screen w-64 bg-black shadow-lg transform transition-transform duration-300 -translate-x-full'
    },
    desktop: 'fixed top-0 left-0 z-30 h-screen w-64 bg-black hidden md:block'
  };

  // Overlay with higher z-index to ensure it's visible
  const overlayStyle = isMobileMenuOpen 
    ? 'fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden' 
    : 'hidden';

  return (
    <>
      {/* Desktop Sidebar - Always visible on md screens and above */}
      <aside className={sidebarStyles.desktop}>
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <Logo />
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <NavItem 
                key={item.path}
                icon={item.icon} 
                label={item.label} 
                path={item.path} 
                isActive={location === item.path}
              />
            ))}
          </ul>
          
          <div className="mt-8 pt-4 border-t border-gray-800">
            <div className="flex items-center p-3 space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="mt-4 flex items-center text-gray-400 hover:text-white transition p-3 w-full"
            >
              <span className="material-icons text-sm mr-2">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile Sidebar - Only visible on small screens when toggled */}
      {mounted && (
        <>
          <div className={overlayStyle} onClick={closeMobileMenu}></div>
          <aside className={isMobileMenuOpen ? sidebarStyles.mobile.open : sidebarStyles.mobile.closed}>
            <div className="p-4 flex items-center justify-between border-b border-gray-800 bg-black">
              <Logo />
              <button 
                onClick={closeMobileMenu}
                className="text-gray-400 hover:text-white"
                aria-label="Close navigation"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <nav className="p-4 bg-black">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <NavItem 
                    key={item.path}
                    icon={item.icon} 
                    label={item.label} 
                    path={item.path} 
                    isActive={location === item.path}
                    onClick={closeMobileMenu}
                  />
                ))}
              </ul>
              
              <div className="mt-8 pt-4 border-t border-gray-800">
                <div className="flex items-center p-3 space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-400">Admin</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="mt-4 flex items-center text-gray-400 hover:text-white transition p-3 w-full"
                >
                  <span className="material-icons text-sm mr-2">logout</span>
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
