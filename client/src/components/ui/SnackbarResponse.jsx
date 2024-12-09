import React from "react";
import { Alert, Snackbar } from "@mui/material";

const SnackbarResponse = ({ isOpen, close, severity, message }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={close}>
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarResponse;
