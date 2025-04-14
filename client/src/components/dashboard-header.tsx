import React from 'react';
import { useMobileMenu } from '@/contexts/mobile-menu-context';

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  const { toggleMobileMenu, isMobileMenuOpen } = useMobileMenu();

  return (
    <div className="bg-background-lighter p-4 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center space-x-3">
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-400 hover:text-white transition"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="material-icons">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
        <h1 className="text-xl font-bold">{title}</h1>
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
