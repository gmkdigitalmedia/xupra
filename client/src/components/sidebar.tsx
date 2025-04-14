import { useLocation } from "wouter";
import Logo from "./logo";
import { useAppContext } from "@/contexts/app-context";
import { useMobileMenu } from "@/contexts/mobile-menu-context";
import { useEffect } from "react";

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

  // Close mobile menu on location change
  useEffect(() => {
    closeMobileMenu();
  }, [location, closeMobileMenu]);

  // Close mobile menu when pressing escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeMobileMenu]);

  const navItems = [
    { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
    { icon: "label", label: "MediTag Engine", path: "/meditag" },
    { icon: "create", label: "ContentCraft AI", path: "/contentcraft" },
    { icon: "trending_up", label: "EngageOptic", path: "/engageoptic" },
    { icon: "pie_chart", label: "InsightLens", path: "/insightlens" },
    { icon: "folder", label: "Asset Management", path: "/asset-management" },
    { icon: "chat", label: "Slack Integration", path: "/slack-integration" },
    { icon: "settings", label: "API Connections", path: "/admin" },
  ];

  // Combine classes for the sidebar based on mobile menu state
  const sidebarClasses = `
    fixed md:static top-0 left-0 z-10
    w-64 md:w-64 
    bg-background-lighter 
    h-screen 
    overflow-y-auto 
    flex-shrink-0
    shadow-lg md:shadow-none
    transition-all duration-300 ease-in-out
    transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  `;

  // Add overlay for mobile
  const overlayClasses = `
    fixed inset-0 bg-black bg-opacity-50 z-0
    transition-opacity duration-300 ease-in-out
    md:hidden
    ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
  `;

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={overlayClasses}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <Logo />
          <button 
            onClick={closeMobileMenu}
            className="md:hidden text-gray-400 hover:text-white"
            aria-label="Close navigation"
          >
            <span className="material-icons">close</span>
          </button>
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
  );
};

export default Sidebar;
