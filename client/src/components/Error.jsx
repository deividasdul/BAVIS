import React from "react";
import { Alert, AlertTitle } from "@mui/material";

const Error = ({ errorMessage }) => {
  return (
    <>
      <Alert variant="filled" severity="error" color="error">
        Klaida
        <AlertTitle>{errorMessage}</AlertTitle>
      </Alert>
    </>
  );
};

export default Error;
