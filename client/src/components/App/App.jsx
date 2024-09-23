import React from "react";
import "./App.css";

import Header from "../Header.jsx";
import Footer from "../Footer.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Rooms from "../pages/Rooms.jsx";
import Dorms from "../pages/dorms.jsx";
import Users from "../pages/Users.jsx";

const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dorms" element={<Dorms />} />
          <Route path="/rooms/:id" element={<Rooms />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
