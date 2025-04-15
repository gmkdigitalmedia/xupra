import * as React from "react";

interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value = 0,
  size = 100,
  strokeWidth = 8,
  className = "",
}) => {
  // Ensure value is between 0 and 100
  const percentage = Math.min(100, Math.max(0, value));
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={`relative w-${size} h-${size} ${className}`} style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(var(--primary), 0.2)"
          strokeWidth={strokeWidth}
        />
      </svg>
      
      {/* Progress circle */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold">{percentage}%</span>
      </div>
    </div>
  );
};