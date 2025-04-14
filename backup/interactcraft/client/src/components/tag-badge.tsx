import React from 'react';

interface TagBadgeProps {
  label: string;
  color?: 'green' | 'blue' | 'purple' | 'indigo' | 'gray' | 'primary';
  active?: boolean;
}

const TagBadge: React.FC<TagBadgeProps> = ({ 
  label, 
  color = 'gray',
  active = false
}) => {
  const colorClasses: Record<TagBadgeProps['color'] & string, string> = {
    green: 'bg-green-900/30 text-green-400',
    blue: 'bg-blue-900/30 text-blue-400',
    purple: 'bg-purple-900/30 text-purple-400',
    indigo: 'bg-indigo-900/30 text-indigo-400',
    primary: 'bg-primary/30 text-white',
    gray: 'bg-background-card'
  };

  return (
    <span className={`px-4 py-2 rounded-full text-sm ${active ? colorClasses[color] : 'bg-background-card'}`}>
      {label}
    </span>
  );
};

export default TagBadge;
