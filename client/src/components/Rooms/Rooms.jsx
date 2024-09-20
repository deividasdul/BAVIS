import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Rooms.css";
import { useParams } from "react-router-dom";

function Rooms() {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/v1/dorms/${id}`
      );
      setRooms(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>
        {rooms.map((room) => {
          return room.id;
        })}
      </h1>
    </>
  );
}

export default Rooms;
