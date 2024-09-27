import React, { useContext, useState } from "react";
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
import Profile from "../pages/Profile.jsx";
import NotFound from "../pages/NotFound.jsx";
import DormsList from "../pages/DormsList.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dorms" element={<Dorms />} />
          <Route path="/rooms/:id" element={<Rooms />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/dorms-list" element={<DormsList />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
