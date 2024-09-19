import React from "react";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

const TextInputField = (props) => {
  return (
    <>
      <Grid size={12}>
        <TextField
          value={props.value}
          fullWidth
          variant="filled"
          label={props.label}
          type={props.type}
          required
          onChange={props.handleUserInput}
          name={props.name}
        ></TextField>
      </Grid>
    </>
  );
};

export default TextInputField;
