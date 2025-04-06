import React from 'react';
import { useLocation } from 'wouter';

interface QuickAccessCardProps {
  icon: string;
  title: string;
  description: string;
  path: string;
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  icon,
  title,
  description,
  path,
  gradientFrom,
  gradientTo,
  iconColor
}) => {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(path);
  };

  return (
    <div 
      className="bg-background-card rounded-xl shadow-lg overflow-hidden cursor-pointer hover:bg-background-lighter transition"
      onClick={handleClick}
    >
      <div className={`h-32 bg-gradient-to-r from-${gradientFrom}/20 to-${gradientTo}/20 flex items-center justify-center`}>
        <span className={`material-icons text-4xl text-${iconColor}`}>{icon}</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default QuickAccessCard;
