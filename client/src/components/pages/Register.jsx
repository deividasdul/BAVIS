import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const Register = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isInputError, setIsInputError] = useState({
    emailInput: false,
    passwordInput: false,
    confirmPasswordInput: false,
  });

  const [inputErrorMessage, setInputErrorMessage] = useState({
    emailHelperText: "",
    passwordHelperText: "",
    confirmPasswordHelperText: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const registerUser = async () => {
    const { email, password, confirmPassword } = userInfo;

    if (!validateEmail(email)) {
      setIsInputError((prevState) => ({
        ...prevState,
        emailInput: true,
      }));
      setInputErrorMessage((prevState) => ({
        ...prevState,
        emailHelperText: "Neteisingas el. pašto formatas",
      }));
      setIsError(true);
      setErrorMessage("Neteisingas el. pašto formatas");
      return;
    }

    setIsInputError((prevState) => ({
      ...prevState,
      emailInput: false,
    }));

    if (password.length <= 8 || confirmPassword.length <= 8) {
      setIsError(true);
      setErrorMessage("Slaptažodis turi būti ilgesnis nei 8 simboliai");

      if (password.length <= 8 && confirmPassword.length <= 8) {
        setIsInputError((prevState) => ({
          ...prevState,
          passwordInput: true,
          confirmPasswordInput: true,
        }));
        setInputErrorMessage((prevState) => ({
          ...prevState,
          passwordHelperText: "Slaptažodis turi būti ilgesnis nei 8 simboliai",
          confirmPasswordHelperText:
            "Slaptažodis turi būti ilgesnis nei 8 simboliai",
        }));
      } else {
        if (confirmPassword.length <= 8) {
          setIsInputError((prevState) => ({
            ...prevState,
            confirmPasswordInput: true,
          }));
          setInputErrorMessage((prevState) => ({
            ...prevState,
            confirmPasswordHelperText:
              "Slaptažodis turi būti ilgesnis nei 8 simboliai",
          }));
        }
        if (password.length <= 8) {
          setIsInputError((prevState) => ({
            ...prevState,
            passwordInput: true,
          }));
        }
      }
      return;
    }

    setIsInputError((prevState) => ({
      ...prevState,
      passwordInput: false,
      confirmPasswordInput: false,
    }));

    if (password !== confirmPassword) {
      setIsError(true);
      setIsInputError((prevState) => ({
        ...prevState,
        passwordInput: true,
        confirmPasswordInput: true,
      }));
      setInputErrorMessage(() => ({
        passwordHelperText: "Abu slaptažodžiai turi sutapti",
        confirmPasswordHelperText: "Abu slaptažodžiai turi sutapti",
      }));
      setErrorMessage("Abu slaptažodžiai turi sutapti");
      return;
    }

    try {
      const response = await insertUser();
      if (response.message === "Email address is already in use") {
        setIsError(true);
        setErrorMessage("El. pašto adresas jau naudojamas");
      } else if (response.message === "User registered successfully") {
        navigate("/login");
      }
    } catch (e) {
      console.error(e);
      setIsError(true);
      setErrorMessage(e.message);
    }
  };

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(userInfo.email);
  }

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
      {isError && (
        <Alert variant="filled" severity="error" color="error">
          <Typography variant="h6">Klaida:</Typography>
          <AlertTitle>
            <Typography variant="h5">{errorMessage}</Typography>
          </AlertTitle>
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper elevation={12}>
          <Typography
            sx={{ mt: 2 }}
            color="primary.main"
            align="center"
            variant="h2"
          >
            Susikurti pakyrą
          </Typography>
          <form action="">
            <Grid maxWidth="md" sx={{ p: 5 }} container spacing={4}>
              <Grid size={12}>
                <TextField
                  error={isInputError.emailInput}
                  helperText={
                    isInputError.emailInput && inputErrorMessage.emailHelperText
                  }
                  value={userInfo.email}
                  fullWidth
                  variant="filled"
                  label="Įveskite savo el. pašto adresą"
                  type="email"
                  required
                  onChange={handleUserInput}
                  name="email"
                ></TextField>
              </Grid>
              <Grid size={12}>
                <TextField
                  value={userInfo.password}
                  error={isInputError.passwordInput}
                  helperText={
                    isInputError.passwordInput &&
                    inputErrorMessage.passwordHelperText
                  }
                  fullWidth
                  variant="filled"
                  label="Įveskite slaptažodį"
                  type="password"
                  required
                  onChange={handleUserInput}
                  name="password"
                ></TextField>
              </Grid>
              <Grid size={12}>
                <TextField
                  value={userInfo.confirmPassword}
                  error={isInputError.confirmPasswordInput}
                  helperText={
                    isInputError.confirmPasswordInput &&
                    inputErrorMessage.confirmPasswordHelperText
                  }
                  fullWidth
                  variant="filled"
                  label="Patvirtinkite slaptažodį"
                  type="password"
                  required
                  onChange={handleUserInput}
                  name="confirmPassword"
                ></TextField>
              </Grid>
              <Button
                size="large"
                fullWidth
                variant="contained"
                sx={{ p: 2 }}
                onClick={(e) => {
                  {
                    e.preventDefault();
                    registerUser();
                  }
                }}
              >
                Užsiregistruoti
              </Button>
              <Grid size={2}></Grid>
              <Grid size={8}>
                <Typography align="center" variant="subtitle1">
                  Spausdamas UŽSIREGISTRUOTI patvirtinu, kad perskaičiau ir
                  supratau terminus ir sąlygas.
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Register;
