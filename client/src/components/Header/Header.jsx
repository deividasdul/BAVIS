import React, { Fragment } from "react";
import "./Header.css";

const Header = () => {
  return (
    <Fragment>
      <header className="header">
        <a href="/">Home</a>
        <a href="/rooms">Rooms</a>
        <a href="/students">Students</a>
        <button className="login-btn">
          <a href="/login">Login</a>
        </button>
        <button className="register-btn">
          <a href="/register">Register</a>
        </button>
      </header>
    </Fragment>
  );
};

export default Header;
