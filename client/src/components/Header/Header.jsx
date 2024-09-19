import React, { Fragment } from "react";
import "./header.css";

const Header = () => {
  return (
    <Fragment>
      <header className="header">
        <nav className="nav-bar">
          <a href="/">Home</a>
          <a href="/register">Sign Up</a>
          <a href="/login">Log In</a>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
