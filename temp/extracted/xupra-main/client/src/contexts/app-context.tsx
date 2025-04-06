import { createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "wouter";

interface AppContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setLocation] = useLocation();

  const login = () => {
    setIsLoggedIn(true);
    setLocation("/dashboard");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLocation("/");
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
