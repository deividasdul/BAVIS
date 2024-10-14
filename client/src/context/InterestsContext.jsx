import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const InterestsContext = createContext();

export const InterestsProvider = ({ children }) => {
  const [interests, setInterests] = useState([]);

  const fetchInterests = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/v1/interests");
      setInterests(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  return (
    <InterestsContext.Provider value={{ interests }}>
      {children}
    </InterestsContext.Provider>
  );
};
