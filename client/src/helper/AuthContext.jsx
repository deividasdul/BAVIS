import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/user", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      setIsLoggedIn(false);
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const login = async (credentials) => {
    const data = {
      username: credentials.email,
      password: credentials.password,
    };

    try {
      const res = await axios.post("http://localhost:3000/auth/login", data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      setIsLoggedIn(true);
      return res.data;
    } catch (e) {
      console.error("Login error:", e.response?.data || e.message);
      throw e;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
