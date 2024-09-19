import React, { useState } from "react";
import axios from "axios";
import TextInputField from "../TextInputField";
import AuthButton from "../AuthButton";

import { Paper, CssBaseline, Alert, AlertTitle, Box } from "@mui/material";

import Grid from "@mui/material/Grid2";
// import AuthForm from "../AuthForm";

const Login = () => {
  const [userInfo, setUserInfo] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const checkCredentials = async (e) => {
    try {
      const response = await logIn();
      console.log(response.message);
    } catch (e) {
      console.error(e);
      setError(true);
      setErrorMessage(e.message);
    }
  };

  const logIn = async () => {
    const { email, password } = userInfo;

    const data = {
      email: email,
      password: password,
    };

    try {
      const result = await axios.post("http://localhost:3000/login", data);
      return result.data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <CssBaseline />
      {error && (
        <Alert variant="filled" severity="error" color="error">
          Error
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      )}
      <Box
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper elevation={12}>
          <form action="">
            <Grid maxWidth="md" sx={{ padding: "25px" }} container spacing={2}>
              <TextInputField
                value={userInfo.email}
                label="Enter your email"
                type="email"
                onChange={handleUserInput}
                name="email"
              />
              <TextInputField
                value={userInfo.password}
                label="Enter password"
                type="password"
                onChange={handleUserInput}
                name="password"
              />
              <AuthButton auth={checkCredentials} btnTitle="Log In" />
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
