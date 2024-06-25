"use client"
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

// Function to fetch user data using Axios
const fetchUser = async () => {
  try {
    const res = await axios.get("/api/auth/profile");
    return res.data.message; // Assuming res.data.message contains user data
  } catch (error) {
    throw new Error("Failed to fetch user data"); // Handle error if API request fails
  }
};

// Create AuthContext
export const AuthContext = createContext();

// Context Provider Component
const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUser();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetchUser = async () => {
    setLoading(true);
    try {
      const data = await fetchUser();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user: userData, loading, error, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
