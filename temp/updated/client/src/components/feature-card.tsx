import React from 'react';
import { useLocation } from 'wouter';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  path: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, path }) => {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(path);
  };

  return (
    <div className="bg-background-card rounded-xl p-6 flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
        <span className="material-icons text-primary">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300 mb-4 flex-grow">
        {description}
      </p>
      <button 
        onClick={handleClick}
        className="text-primary hover:text-primary/80 font-medium flex items-center"
      >
        Explore
        <span className="material-icons text-sm ml-1">arrow_forward</span>
      </button>
    </div>
  );
};

export default FeatureCard;
