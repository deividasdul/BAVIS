import React, { Fragment } from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <Fragment>
      <section>
        <footer>
          <p>© {new Date().getFullYear()} Deividas Dulinskas</p>
        </footer>
      </section>
    </Fragment>
  );
};

export default Footer;
