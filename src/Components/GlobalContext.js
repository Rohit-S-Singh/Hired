// src/context/GlobalContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // ✅ Get token from localStorage (adjust if using cookies or session storage)
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setIsLoggedIn(false);
          setUser(null);
          setLoading(false);
          return;
        }

        // ✅ Send request with Authorization header
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/verifytoken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
            console.log(response);

        if (response.data.success && response.data.user) {
          setUser(response.data.user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Token verification failed:", error.response?.data || error);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, loading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
