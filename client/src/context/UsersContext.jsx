import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const [contact, setContact] = useState({});
  const [selectedInterestIds, setSelectedInterestIds] = useState([]);
  const [selectedInterestNames, setSelectedInterestNames] = useState([]);

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

  const fetchContact = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/v1/users/${id}`
      );
      setContact(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUserInterests = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/v1/users/${id}/interests`
      );
      const interestIds = result.data.map((interest) => interest.interest_id);
      const interestNames = result.data.map((interest) => interest.interest);

      setSelectedInterestIds(interestIds);
      setSelectedInterestNames(interestNames);
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
      value={{
        users,
        deleteUser,
        isLoading,
        patchUser,
        fetchUsers,
        fetchContact,
        contact,
        fetchUserInterests,
        selectedInterestIds,
        setSelectedInterestIds,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
