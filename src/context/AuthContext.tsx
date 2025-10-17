// src/context/AuthContext.tsx
"use client"
import { userStore } from "@/helpers/UserStore";
import { AuthUser, User } from "@/types/User";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";


// 1. Define the shape of the Context State
interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => boolean; 
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean; // Utility for access control (Requirement 4.2)
}

// Default state of the context
const defaultContextValue: AuthContextType = {
  user: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
  isAdmin: false,
};

// 2. Create the Context
const AuthContext = createContext<AuthContextType>(defaultContextValue);

// 3. Create the Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Basic Persistence Check (local storage)
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);

  // const login = (username: string, password: string): boolean => {
  //   // 1. Use UserStore to find the user
  //   const foundUser: User | undefined = userStore.findByUsername(username);

  //   // 2. Simple Authentication Check (Requirement 3.2, 4.2)
  //   if (foundUser && foundUser.password === password) {
  //     const authPayload: AuthUser = {
  //       username: foundUser.username,
  //       role: foundUser.role,
  //       isLoggedIn: true,
  //     };
      
  //     setAuthUser(authPayload);
  //     localStorage.setItem('authUser', JSON.stringify(authPayload));
  //     console.log(`[AUTH] User ${username} logged in successfully with role: ${foundUser.role}`);
  //     return true; // Success
  //   }

  //   console.warn(`[AUTH] Login failed for user: ${username}`);
  //   return false; // Failure
  // };
  // src/context/AuthContext.tsx (Dentro de AuthProvider)

const login = (username: string, password: string): boolean => {
    // 1. Use UserStore to find the user
    const foundUser: User | undefined = userStore.findByUsername(username);
    
    // 🚨 START OF CRITICAL DEBUG
    console.log('--- AUTHENTICATION DEBUG ---');
    console.log(`Searching for user: ${username}`);
    console.log(`1. Entered Password (Length ${password.length}): "${password}"`);
    console.log(`2. Stored Password (Length ${foundUser?.password?.length}): "${foundUser?.password}"`);
    console.log(`3. Match: ${foundUser && foundUser.password === password}`);
    console.log('----------------------------');
    // 🚨 END OF CRITICAL DEBUG
    
    // 2. Simple Authentication Check (Requirement 3.2, 4.2)
    if (foundUser && foundUser.password === password) {
      const authPayload: AuthUser = {
        username: foundUser.username,
        role: foundUser.role,
        isLoggedIn: true,
      };
      
      setAuthUser(authPayload);
      localStorage.setItem('authUser', JSON.stringify(authPayload));
      console.log(`[AUTH] User ${username} logged in successfully with role: ${foundUser.role}`);
      return true; // Success
    }

    console.warn(`[AUTH] Login failed for user: ${username}`);
    return false; // Failure
};

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('authUser');
    console.log('[AUTH] User logged out.');
  };

  const isAuthenticated = !!authUser?.isLoggedIn;
  const isAdmin = authUser?.role === 'admin';

  const contextValue: AuthContextType = {
    user: authUser,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom Hook for easy consumption
export const useAuth = () => {
  return useContext(AuthContext);
};


