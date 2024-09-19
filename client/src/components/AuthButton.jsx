import React from "react";
import { Button } from "@mui/material";

const AuthButton = (props) => {
  return (
    <>
      <Button
        size="large"
        color="success"
        fullWidth
        variant="contained"
        onClick={() => {
          {
            props.auth();
          }
        }}
      >
        {props.btnTitle}
      </Button>
    </>
  );
};

export default AuthButton;
