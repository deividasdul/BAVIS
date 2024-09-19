import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  CssBaseline,
  Alert,
  AlertTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/system";
import TextInputField from "../TextInputField";
import AuthButton from "../AuthButton";

const Register = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const registerUser = async (e) => {
    const { password, confirmPassword } = userInfo;

    if (password === confirmPassword) {
      try {
        const response = await insertUser();
        if (response.message === "Email address is already in use") {
          setError(true);
          setErrorMessage(response.message);
        } else if (response.message === "User registered successfully") {
          navigate("/login");
        }
      } catch (e) {
        console.error(e);
        setError(true);
        setErrorMessage(e.message);
        e.preventDefault();
      }
    } else {
      setError(true);
      setErrorMessage("Both passwords must match ");
      e.preventDefault();
    }
  };

  const insertUser = async () => {
    const { email, password } = userInfo;

    const data = {
      email: email,
      password: password,
    };

    try {
      const result = await axios.post(
        "http://localhost:3000/auth/register",
        data
      );
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
          <Typography color="success" align="center" variant="h2">
            Registration
          </Typography>
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
        </Paper>
      </Box>
    </>
  );
};

export default Register;
