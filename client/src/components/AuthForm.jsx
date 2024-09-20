import React from "react";
import Grid from "@mui/material/Grid2";
import TextInputField from "./TextInputField";

import {
  Paper,
  Typography,
  CssBaseline,
  Alert,
  AlertTitle,
  Box,
  Link,
} from "@mui/material";
import AuthButton from "./AuthButton";

const AuthForm = (props) => {
  return (
    <>
      <CssBaseline />
      {props.error && (
        <Alert variant="filled" severity="error" color="error">
          Error
          <AlertTitle>{props.errorMessage}</AlertTitle>
        </Alert>
      )}
      <Box
        container="true"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <Paper elevation={12}>
          <Typography
            sx={{ mt: 2 }}
            color="primary"
            align="center"
            variant="h2"
          >
            {props.formTitle}
          </Typography>
          <form action="">
            <Grid maxWidth="md" sx={{ p: 5 }} container spacing={4}>
              <TextInputField
                value={props.userInfo.email}
                label="Enter your email"
                type="email"
                handleUserInput={props.handleUserInput}
                name="email"
              />
              <TextInputField
                value={props.userInfo.password}
                label="Enter password"
                type="password"
                handleUserInput={props.handleUserInput}
                name="password"
              />
              {props.isRegister && (
                <TextInputField
                  value={props.userInfo.confirmPassword}
                  label="Confirm password"
                  type="password"
                  handleUserInput={props.handleUserInput}
                  name="confirmPassword"
                />
              )}
              <AuthButton auth={props.submit} btnTitle={props.btnSubmitTitle} />
              {props.isRegister ? (
                <>
                  <Grid size={2}></Grid>
                  <Grid size={8}>
                    <Typography align="center" variant="subtitle1">
                      By clicking CREATE ACCOUNT, I state that I have read and
                      understood the terms and conditions.
                    </Typography>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid size={2}></Grid>
                  <Grid size={8}>
                    <Typography align="center" variant="subtitle1">
                      <Link variant="button">Forgot Password</Link>
                    </Typography>
                  </Grid>
                  <Grid size={2}></Grid>
                </>
              )}
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default AuthForm;
