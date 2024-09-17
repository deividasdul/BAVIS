import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./Rooms.css";

function Rooms() {
  const apiURL = "http://localhost:3000/api/v1";

  const [rooms, setRooms] = useState([]);
  const [dorms, setDorms] = useState([]);

  const fetchRooms = async () => {
    try {
      const result = await axios.get(`${apiURL}/rooms/`);
      const data = result.data;
      setRooms(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDorms = async () => {
    try {
      const result = await axios.get(`${apiURL}/dorms/`);
      const data = result.data;
      setDorms(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDorms();
    fetchRooms();
  }, []);

  return (
    <Fragment>
      {/* {dorms.map((dorm) => {
        return rooms.map((room) => {
          return (
            <div key={room.id} className="room-card">
              <h1>{dorm.address}</h1>
              <h1>Room Number: {room.number}</h1>
              <h1>Room Floor: {room.floor}</h1>
              <h1>Room Capacity: {room.capacity}</h1>
              <h1>Room Price: {room.price}</h1>
              <h1>Room Dormitory: {room.dormitory_id}</h1>
            </div>
          );
        });
      })} */}
      <div className="select-dorm">
        {dorms.map((dorm) => (
          <Fragment>
            <button className="dorm-button">{dorm.address}</button>
            {/* {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <h1>Room Number: {room.number}</h1>
              <h1>Room Floor: {room.floor}</h1>
              <h1>Room Capacity: {room.capacity}</h1>
              <h1>Room Price: {room.price}</h1>
              <h1>Room Dormitory: {room.dormitory_id}</h1>
            </div>
          ))} */}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
}

export default Rooms;
