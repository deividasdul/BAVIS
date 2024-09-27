import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const apiURL = "http://localhost:3000/api/v1/rooms";

  const [rooms, setRooms] = useState([]);

  const { id } = useParams();

  const insertRoom = async (number, floor, capacity, price, id) => {
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

  const putRoom = async (roomId) => {
    const data = {
      number: input.number,
      floor: input.floor,
      capacity: input.capacity,
      price: input.price,
      dormitory_id: id,
    };
    try {
      await axios.put(`${apiURL}/${roomId}`, data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await axios.delete(`${apiURL}/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [rooms]);

  return (
    <RoomsContext.Provider value={{ rooms, insertRoom, putRoom, deleteRoom }}>
      {children}
    </RoomsContext.Provider>
  );
};
