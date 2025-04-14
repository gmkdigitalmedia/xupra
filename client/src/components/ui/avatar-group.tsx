import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
}

/**
 * A component for displaying a group of avatars with overlap.
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, ...props }, ref) => {
    const avatars = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child.type === Avatar
    );

    const count = avatars.length;
    const maxAvatars = max || 3;

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-2", className)}
        {...props}
      >
        {avatars.slice(0, maxAvatars).map((avatar, index) => (
          <div key={index} className="relative inline-block">
            {avatar}
          </div>
        ))}
        {count > maxAvatars && (
          <div className="relative flex items-center justify-center h-8 w-8 bg-muted rounded-full text-xs">
            +{count - maxAvatars}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";