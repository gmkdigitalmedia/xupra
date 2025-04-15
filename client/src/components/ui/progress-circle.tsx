import React from "react";
import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  color?: string;
  thickness?: number;
  strokeWidth?: number; // Alias for thickness
  className?: string;
  showLabel?: boolean;
}

export const ProgressCircle = ({
  value,
  max = 100,
  size = "md",
  label,
  color = "bg-primary",
  thickness = 4,
  className,
  showLabel = true,
}: ProgressCircleProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        className={cn("transform -rotate-90", sizeClasses[size])}
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          className="text-muted stroke-current opacity-20"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={thickness}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          className={cn("stroke-current", color.startsWith("bg-") ? color.replace("bg-", "text-") : color)}
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-semibold", textSizeClasses[size])}>
            {label || `${Math.round(percentage)}%`}
          </span>
        </div>
      )}
    </div>
  );
};

// Usage examples:
// <ProgressCircle value={75} />
// <ProgressCircle value={42} max={100} size="lg" color="bg-blue-500" />
// <ProgressCircle value={3} max={10} label="3/10" thickness={6} />