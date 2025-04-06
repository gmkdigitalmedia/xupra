import React from 'react';
import { useLocation } from 'wouter';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const [, setLocation] = useLocation();
  const sizes = {
    sm: { svg: 'w-6 h-6', text: 'text-lg' },
    md: { svg: 'w-8 h-8', text: 'text-xl' },
    lg: { svg: 'w-10 h-10', text: 'text-2xl' },
  };

  const goToDashboard = () => {
    setLocation('/dashboard');
  };

  return (
    <div 
      className="flex items-center space-x-2 cursor-pointer" 
      onClick={goToDashboard}
      title="Go to Dashboard"
    >
      <svg className={sizes[size].svg} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M10 10 L50 50 M10 50 L50 10" 
          stroke="currentColor" 
          strokeWidth="10" 
          strokeLinecap="round"
          className="text-primary"
        />
      </svg>
      {withText && (
        <span className={`${sizes[size].text} font-bold`}>Xupra</span>
      )}
    </div>
  );
};

export default Logo;
