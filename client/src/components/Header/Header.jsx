import React, { Fragment } from "react";
import "./Header.css";

const Header = () => {
  return (
    <Fragment>
      <header className="header">
        <a href="/">Home</a>
        <a href="/rooms">Rooms</a>
        <a href="/students">Students</a>
      </header>
    </Fragment>
  );
};

export default Header;
