import React, { Fragment } from "react";
import Home from "../Home/Home.jsx";
import Rooms from "../Rooms/Rooms.jsx";
import Students from "../Students/Students.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Header/Header.jsx";

function App() {
  return (
    <Fragment>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/rooms" element={<Rooms />} />
          <Route path="/students" element={<Students />} /> */}
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
