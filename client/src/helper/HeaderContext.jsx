import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const location = useLocation();
  const [isSelected, setIsSelected] = useState({
    home: false,
    login: false,
    register: false,
    dormsList: false,
    adminPanel: false,
    profile: false,
  });

  const adminPanelPaths = ["/profile", "/dorms", "/users", "/notifications"];
  const userPanelPaths = ["/profile", "/payment-history"];

  useEffect(() => {
    setIsSelected({
      home: location.pathname === "/",
      login: location.pathname === "/login",
      register: location.pathname === "/register",
      dormsList: location.pathname === "/dorms-list",
      adminPanel: adminPanelPaths.includes(location.pathname),
      userPanel: userPanelPaths.includes(location.pathname),
    });
  }, [location.pathname]);

  return (
    <HeaderContext.Provider value={{ isSelected }}>
      {children}
    </HeaderContext.Provider>
  );
};
