// src/context/GlobalContext.js
import React, { createContext, useContext, useState } from "react";

// Create the context
const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use context
export const useGlobalContext = () => useContext(GlobalContext);
