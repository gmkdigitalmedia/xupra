import React from 'react';

interface TagBadgeProps {
  label: string;
  color?: 'green' | 'blue' | 'purple' | 'indigo' | 'gray' | 'primary';
  active?: boolean;
  onClick?: () => void;
}

const TagBadge: React.FC<TagBadgeProps> = ({ 
  label, 
  color = 'gray',
  active = false,
  onClick
}) => {
  const colorClasses = {
    green: 'bg-green-900/30 text-green-400',
    blue: 'bg-blue-900/30 text-blue-400',
    purple: 'bg-purple-900/30 text-purple-400',
    indigo: 'bg-indigo-900/30 text-indigo-400',
    primary: 'bg-primary/20 text-primary border border-primary/30',
    gray: 'bg-background-card'
  };

  const baseClasses = "px-4 py-2 rounded-full text-sm transition-colors";
  const activeClasses = color === 'primary' 
    ? colorClasses.primary 
    : colorClasses[color];
  const inactiveClasses = 'bg-background-card text-gray-400 border border-gray-700';
  
  return (
    <span 
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses} ${onClick ? 'cursor-pointer hover:bg-opacity-80' : ''}`}
      onClick={onClick}
    >
      {active && <span className="mr-1">✓</span>}
      {label}
    </span>
  );
};

export default TagBadge;
