import { createContext, useState } from "react";

export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const savedMode = localStorage.getItem("isDarkMode") === "true";
  const [isDarkMode, setIsDarkMode] = useState(savedMode);

  const handleThemeChange = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("isDarkMode", newMode);
  };

  return (
    <ModeContext.Provider value={{ isDarkMode, handleThemeChange }}>
      {children}
    </ModeContext.Provider>
  );
};
