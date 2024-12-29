import React, { createContext, useEffect, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    // Simulate an authentication check
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 3000);
  }, []);

  const login = async (email, password) => {
    try {
      // Implement login logic here
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    try {
      // Implement logout logic here
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      // Implement registration logic here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);