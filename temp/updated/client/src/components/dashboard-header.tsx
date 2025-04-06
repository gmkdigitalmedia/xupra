import React from 'react';

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <div className="bg-background-lighter p-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-xl font-bold">{title}</h1>
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
