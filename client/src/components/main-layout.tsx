import { ReactNode } from 'react';
import Sidebar from './sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  // This layout component ensures proper spacing between sidebar and content
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      {/* Main content area - pushed to the right on md+ screens */}
      <div className="flex-1 overflow-auto md:ml-64">
        {children}
      </div>
    </div>
  );
}