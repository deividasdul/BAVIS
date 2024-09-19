import React from "react";
import Grid from "@mui/material/Grid2";
import TextInputField from "./TextInputField";
import {
  Paper,
  Typography,
  CssBaseline,
  Alert,
  AlertTitle,
} from "@mui/material";

const AuthForm = () => {
  return (
    <>
      <form action="">
        <Grid maxWidth="md" sx={{ padding: "25px" }} container spacing={2}>
          <TextInputField
            value={userInfo.email}
            label="Enter your email"
            type="email"
            handleUserInput={handleUserInput}
            name="email"
          />
          <TextInputField
            value={userInfo.password}
            label="Enter password"
            type="password"
            handleUserInput={handleUserInput}
            name="password"
          />
          <TextInputField
            value={userInfo.confirmPassword}
            label="Confirm password"
            type="password"
            handleUserInput={handleUserInput}
            name="confirmPassword"
          />
          <AuthButton auth={registerUser} btnTitle="Create Account" />
          <Grid size={2}></Grid>
          <Grid size={8}>
            <Typography align="center" variant="subtitle1">
              By clicking Create Account, I state that I have read and
              understood the terms and conditions.
            </Typography>
          </Grid>
          <Grid size={2}></Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuthForm;
