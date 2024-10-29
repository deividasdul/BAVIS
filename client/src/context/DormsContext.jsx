import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DormsContext = createContext();

export const DormsProvider = ({ children }) => {
  const apiURL = "http://localhost:3000/api/v1/dorms";

  const [dorms, setDorms] = useState([]);

  const insertDorm = async (address) => {
    const data = {
      address: address,
    };
    try {
      await axios.post(apiURL, data);
      fetchDorms();
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDorms = async () => {
    try {
      const result = await axios.get(apiURL);
      setDorms(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  const putDorm = async (id, address) => {
    const data = {
      address: address,
    };
    try {
      await axios.put(`${apiURL}/${id}`, data);
      fetchDorms();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteDorm = async (id) => {
    try {
      await axios.delete(`${apiURL}/${id}`);
      fetchDorms();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDorms();
  }, []);

  return (
    <DormsContext.Provider value={{ dorms, insertDorm, putDorm, deleteDorm }}>
      {children}
    </DormsContext.Provider>
  );
};
