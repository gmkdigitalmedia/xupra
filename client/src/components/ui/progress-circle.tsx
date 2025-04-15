import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  value: number;
  size?: "sm" | "md" | "lg" | "xl";
  strokeWidth?: number;
  className?: string;
}

export function ProgressCircle({
  value,
  size = "md",
  strokeWidth = 4,
  className,
}: ProgressCircleProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  // Calculate size based on prop
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
    xl: 120,
  };
  
  const pixelSize = sizeMap[size];
  const center = pixelSize / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;

  // Determine color based on value
  const getColor = () => {
    if (normalizedValue >= 75) return "text-green-400";
    if (normalizedValue >= 50) return "text-blue-400";
    if (normalizedValue >= 25) return "text-amber-400";
    return "text-red-400";
  };
  
  // Font size based on circle size
  const getFontSize = () => {
    if (size === "xl") return "text-xl";
    if (size === "lg") return "text-lg";
    if (size === "sm") return "text-xs";
    return "text-sm";
  };

  return (
    <div className={cn("relative", className)}>
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox={`0 0 ${pixelSize} ${pixelSize}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          className="fill-none stroke-muted/30"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          className={`fill-none ${getColor()}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Value text */}
      <div 
        className={`absolute inset-0 flex items-center justify-center font-semibold ${getFontSize()}`}
      >
        {normalizedValue}%
      </div>
    </div>
  );
}