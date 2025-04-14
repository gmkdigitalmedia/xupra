import React from 'react';

interface ModuleSectionProps {
  number: string;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  children: React.ReactNode;
}

const ModuleSection: React.FC<ModuleSectionProps> = ({
  number,
  title,
  description,
  actionLabel,
  onAction,
  children
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
      <div>
        <div className="inline-block bg-primary/10 text-primary font-medium px-3 py-1 rounded-full mb-4">
          {number}
        </div>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">
          {description}
        </p>
        <button 
          onClick={onAction}
          className="bg-primary hover:bg-primary/80 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          {actionLabel}
        </button>
        {children}
      </div>
      <div className="bg-background-card rounded-xl p-6 shadow-lg">
        <div className="overflow-hidden rounded-lg">
          {/* Content will be passed as children */}
        </div>
      </div>
    </div>
  );
};

export default ModuleSection;
