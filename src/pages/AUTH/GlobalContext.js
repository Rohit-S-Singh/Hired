// src/context/GlobalContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // spinner flag

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          setIsLoggedIn(false);
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/verifytoken`,
          {}, // empty body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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


  console.log(user);
  

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, loading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
