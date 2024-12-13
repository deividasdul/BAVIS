import { createContext, useState } from "react";
import axios from "axios";

export const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const apiURL = "http://localhost:3000/api/v1/rooms";

  const [rooms, setRooms] = useState([]);

  const insertRoom = async ({ number, floor, capacity, price, id }) => {
    const data = {
      number: number,
      floor: floor,
      capacity: capacity,
      price: price,
      dormitory_id: id,
    };

    try {
      await axios.post(apiURL, data);
    } catch (e) {
      console.error(e);
    }
  };

  // getDormRooms routes
  const fetchRooms = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/v1/dorms/${id}`
      );
      setRooms(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  const putRoom = async ({ number, floor, capacity, price, id }, roomId) => {
    const data = {
      number: number,
      floor: floor,
      capacity: capacity,
      price: price,
      dormitory_id: id,
    };
    try {
      await axios.put(`${apiURL}/${roomId}`, data);
      fetchRooms();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      await axios.delete(`${apiURL}/${roomId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <RoomsContext.Provider
      value={{ rooms, fetchRooms, insertRoom, putRoom, deleteRoom }}
    >
      {children}
    </RoomsContext.Provider>
  );
};
