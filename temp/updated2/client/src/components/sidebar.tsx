import { useLocation } from "wouter";
import Logo from "./logo";
import { useAppContext } from "@/contexts/app-context";

const NavItem = ({ 
  icon, 
  label, 
  path, 
  isActive 
}: { 
  icon: string; 
  label: string; 
  path: string; 
  isActive: boolean 
}) => {
  const [, setLocation] = useLocation();

  return (
    <li>
      <a 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setLocation(path);
        }} 
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

  const navItems = [
    { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
    { icon: "label", label: "MediTag Engine", path: "/meditag" },
    { icon: "create", label: "ContentCraft AI", path: "/contentcraft" },
    { icon: "trending_up", label: "EngageOptic", path: "/engageoptic" },
    { icon: "pie_chart", label: "InsightLens", path: "/insightlens" },
    { icon: "folder", label: "Asset Management", path: "/asset-management" },
  ];

  return (
    <aside className="w-full md:w-64 bg-background-lighter h-auto md:h-screen overflow-y-auto flex-shrink-0">
      <div className="p-4 flex items-center space-x-2 border-b border-gray-800">
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
  );
};

export default Sidebar;
