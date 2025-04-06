import React from 'react';

interface ComplianceBadgeProps {
  status: 'approved' | 'warning' | 'rejected';
  label: string;
}

const ComplianceBadge: React.FC<ComplianceBadgeProps> = ({ status, label }) => {
  const statusConfig = {
    approved: {
      bgColor: 'bg-green-900/30',
      textColor: 'text-green-400',
      icon: 'check_circle'
    },
    warning: {
      bgColor: 'bg-yellow-900/30',
      textColor: 'text-yellow-400',
      icon: 'warning'
    },
    rejected: {
      bgColor: 'bg-red-900/30',
      textColor: 'text-red-400',
      icon: 'error'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center ${config.bgColor} ${config.textColor} text-xs px-2 py-1 rounded`}>
      <span className="material-icons text-sm mr-1">{config.icon}</span> 
      {label}
    </span>
  );
};

export default ComplianceBadge;
