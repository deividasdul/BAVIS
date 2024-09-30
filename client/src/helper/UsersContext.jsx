import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const usersData = await axios.get("http://localhost:3000/api/v1/users");
      setUsers(usersData.data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const putUser = async ({ firstName, lastName }, id) => {
    const data = {
      first_name: firstName,
      last_name: lastName,
    };

    try {
      await axios.put(`http://localhost:3000/api/v1/users/${id}`, data);
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const patchUser = async (input, id) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/users/${id}`, input);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{ users, putUser, deleteUser, isLoading, patchUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};
