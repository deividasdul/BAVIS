import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const [contact, setContact] = useState({});
  const [selectedInterestIds, setSelectedInterestIds] = useState([]);
  const [selectedInterestNames, setSelectedInterestNames] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState();

  const fetchUsers = async () => {
    try {
      const usersData = await axios.get("http://localhost:3000/api/v1/users");
      setUsers(usersData.data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const uploadAvatar = async (event, id) => {
    const file = event.target.files[0];

    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    setAvatarUrl(fileUrl);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await axios.post(
        `http://localhost:3000/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newAvatarUrl = `/images/profile-images/${result.data.filename}`;

      setAvatarUrl(newAvatarUrl);
      setContact((prevContact) => ({
        ...prevContact,
        avatar_url: newAvatarUrl,
      }));
    } catch (error) {
      console.error(error);
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

  const putUser = async (input, id) => {
    const data = {
      first_name: input.firstName,
      last_name: input.lastName,
    };

    try {
      await axios.put(`http://localhost:3000/api/v1/users/${id}`, data);
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${id}`);
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
    // fetchContact();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        putUser,
        deleteUser,
        isLoading,
        patchUser,
        fetchUsers,
        fetchContact,
        contact,
        fetchUserInterests,
        selectedInterestIds,
        setSelectedInterestIds,
        uploadAvatar,
        setAvatarUrl,
        avatarUrl,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
