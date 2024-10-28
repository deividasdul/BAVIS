import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const result = await axios.get(
        "http://localhost:3000/api/v1/notifications/"
      );
      setNotifications(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  const changeStatus = async (id) => {
    try {
      const result = await axios.patch(
        `http://localhost:3000/api/v1/notifications/${id}`
      );
      fetchNotifications();
    } catch (e) {
      console.error(e);
    }
  };

  const addNotification = async (message) => {
    const data = {
      message: message,
    };

    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/notifications",
        data
      );
      fetchNotifications();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationsContext.Provider
      value={{ notifications, changeStatus, addNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
