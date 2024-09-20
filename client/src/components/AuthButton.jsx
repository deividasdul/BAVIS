import React from "react";
import { Button } from "@mui/material";

const AuthButton = (props) => {
  return (
    <>
      <Button
        size="large"
        color="primary"
        fullWidth
        variant="contained"
        sx={{ p: 2 }}
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
