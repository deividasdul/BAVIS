import React from "react";
import { Button } from "@mui/material";

const NavigationButton = (props) => {
  return (
    <>
      <Button
        size="large"
        href={props.href}
        variant="contained"
        startIcon={props.icon}
        color="info"
        sx={{ marginRight: "8px" }}
      >
        {props.name}
      </Button>
    </>
  );
};

export default NavigationButton;
