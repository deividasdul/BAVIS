import React, { Fragment } from "react";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Home from "../Home/Home.jsx";
import Rooms from "../Rooms/Rooms.jsx";
import Students from "../Students/Students.jsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
