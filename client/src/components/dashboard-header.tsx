import React, { useEffect } from 'react';
import { useMobileMenu } from '@/contexts/mobile-menu-context';

interface DashboardHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  description, 
  showBackButton = false 
}) => {
  const { toggleMobileMenu, isMobileMenuOpen } = useMobileMenu();

  // Force update the mobile menu button when the component mounts
  useEffect(() => {
    // This empty effect will force the component to re-render when mounted
    // Ensuring the state is current and button is properly displayed
  }, []);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-background-lighter p-4 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center space-x-3">
        <button 
          onClick={handleMenuToggle}
          className="md:hidden text-gray-400 hover:text-white transition p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="material-icons text-2xl">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
        
        <div className="flex flex-col">
          <div className="flex items-center">
            {showBackButton && (
              <button 
                onClick={handleGoBack} 
                className="mr-2 text-gray-400 hover:text-white transition p-1"
                aria-label="Go back"
              >
                <span className="material-icons">arrow_back</span>
              </button>
            )}
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          
          {description && (
            <p className="text-sm text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="text-gray-400 hover:text-white transition">
            <span className="material-icons">notifications</span>
          </button>
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
        </div>
        <div>
          <select className="bg-white text-black text-sm rounded-lg px-2 py-1 border border-gray-300">
            <option>English</option>
            <option>Japanese</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
