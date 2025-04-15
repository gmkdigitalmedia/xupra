import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface MobileMenuContextProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openMobileMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextProps | undefined>(undefined);

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle window resize to close mobile menu on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint is 768px
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial check in case the window starts large
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for route changes to close the menu - but removing this
  // as it was causing issues with the menu not showing when toggled
  // We'll handle menu closing in specific components as needed

  const toggleMobileMenu = () => {
    // Using the functional form of setState to ensure we're always working with the latest state
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      // For debugging
      console.log("Mobile menu toggled. New state:", newState);
      return newState;
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  return (
    <MobileMenuContext.Provider value={{ isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, openMobileMenu }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (context === undefined) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider');
  }
  return context;
}