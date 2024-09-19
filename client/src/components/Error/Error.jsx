import React, { Fragment } from "react";
import "./Error.css";

const Error = (props) => {
  return (
    <Fragment>
      <h2 className="error-message">{props.errorMessage}</h2>
    </Fragment>
  );
};

export default Error;
