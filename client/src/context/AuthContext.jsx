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
    } catch (e) {
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

  const register = async (credentials) => {
    const {
      email,
      password,
      firstName,
      lastName,
      gender,
      phoneNumber,
      userStatus,
      faculty,
      userGroup,
    } = credentials;

    const data = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      phoneNumber: phoneNumber,
      userStatus: userStatus,
      faculty: faculty,
      userGroup: userGroup,
    };

    try {
      const result = await axios.post(
        "http://localhost:3000/auth/register",
        data
      );
      return result.data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isLoggedIn,
        setIsLoggedIn,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
