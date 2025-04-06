import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  change: {
    value: string;
    positive: boolean;
  };
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, change, color }) => {
  return (
    <div className="bg-background-card p-4 rounded-xl shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className={`w-10 h-10 ${color}/10 rounded-lg flex items-center justify-center`}>
          <span className={`material-icons ${color}`}>{icon}</span>
        </div>
      </div>
      <div className={`flex items-center ${change.positive ? 'text-success' : 'text-warning'} text-sm`}>
        <span className="material-icons text-sm mr-1">
          {change.positive ? 'arrow_upward' : 'arrow_downward'}
        </span>
        <span>{change.value}</span>
      </div>
    </div>
  );
};

export default StatsCard;
