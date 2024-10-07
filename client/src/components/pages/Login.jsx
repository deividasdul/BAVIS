import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { useAuth } from "../../helper/AuthContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  // Show forgot password Dialog component if it's open
  const [open, setOpen] = useState(false);

  const handleDialog = () => {
    setOpen(!open);
  };

  // Forgot password email address input
  const [emailAddress, setEmailAddress] = useState("");

  const [isInputError, setIsInputError] = useState({
    emailInput: false,
    passwordInput: false,
    forgotPasswordEmailInput: false,
  });

  const [inputErrorMessage, setInputErrorMessage] = useState({
    emailInput: "",
    passwordInput: "",
    forgotPasswordEmailInput: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setEmailAddress(e.target.value);
  };

  const sendRecoveryEmail = async () => {
    if (emailAddress <= 0) {
      setIsInputError((prevState) => ({
        ...prevState,
        forgotPasswordEmailInput: true,
      }));
      setInputErrorMessage((prevValue) => ({
        ...prevValue,
        forgotPasswordEmailInput: "El. pašto laukas negali būti tuščias",
      }));
      return;
    }

    clearEmailError();

    if (!isValidEmail(emailAddress)) {
      setIsInputError((prevState) => ({
        ...prevState,
        forgotPasswordEmailInput: true,
      }));
      setInputErrorMessage((prevValue) => ({
        ...prevValue,
        forgotPasswordEmailInput: "Neteisingas el. pašto formatas",
      }));
      return;
    }

    clearEmailError();

    try {
      setIsSending(true);
      const data = {
        recipient: emailAddress,
      };
      await axios.post("http://localhost:3000/auth/forgot-password", data);
      setIsSending(false);
      handleDialog();
    } catch (e) {
      setIsSending(false);
      setIsInputError((prevState) => ({
        ...prevState,
        forgotPasswordEmailInput: true,
      }));
      setInputErrorMessage((prevValue) => ({
        ...prevValue,
        forgotPasswordEmailInput: "Šis el. paštas mūsų sistemoje neegzistuoja",
      }));
    }
  };

  const clearEmailError = () => {
    setIsInputError((prevState) => ({
      ...prevState,
      emailInput: false,
      forgotPasswordEmailInput: false,
    }));
    setInputErrorMessage((prevValue) => ({
      ...prevValue,
      emailInput: "",
      forgotPasswordEmailInput: "",
    }));
  };

  const clearPasswordError = () => {
    setIsInputError((prevState) => ({
      ...prevState,
      passwordInput: false,
    }));
    setInputErrorMessage((prevValue) => ({
      ...prevValue,
      passwordInput: "",
    }));
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleLogin = async () => {
    const { email, password } = userInfo;

    if (email.length <= 0) {
      clearPasswordError();
      setIsInputError((prevState) => ({
        ...prevState,
        emailInput: true,
      }));
      setInputErrorMessage((prevValue) => ({
        ...prevValue,
        emailInput: "El. pašto laukas negali būti tuščias",
      }));
      return;
    }

    clearEmailError();

    if (!isValidEmail(email)) {
      clearPasswordError();
      setIsInputError((prevState) => ({
        ...prevState,
        emailInput: true,
      }));
      setInputErrorMessage((prevValue) => ({
        ...prevValue,
        emailInput: "Neteisingas el. pašto formatas",
      }));
      return;
    }

    clearEmailError();

    if (password.length <= 0) {
      setIsInputError((prevState) => ({
        ...prevState,
        passwordInput: true,
      }));
      setInputErrorMessage((prevValue) => ({
        ...prevValue,
        passwordInput: "Slaptažodžio laukas negali būti tuščias",
      }));
      return;
    }

    clearPasswordError();

    try {
      setIsLoading(true);
      clearEmailError();
      clearPasswordError();
      await login(userInfo);
      setIsLoading(false);
      navigate("/profile");
    } catch (e) {
      setIsLoading(false);
      setIsInputError({
        emailInput: true,
        passwordInput: true,
      });
      setInputErrorMessage({
        emailInput: "Neteisingas el. pašto adresas ir (arba) slaptažodis",
        passwordInput: "Neteisingas el. pašto adresas ir (arba) slaptažodis",
      });
      console.log(e);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <>
      {isLoading ? (
        <LoginBox>
          <CircularProgress disableShrink={false} size={"25%"} />
        </LoginBox>
      ) : (
        <LoginBox>
          <Paper sx={{ p: 5 }} elevation={12}>
            <Typography
              color="primary.main"
              align="center"
              variant="h2"
              gutterBottom
            >
              Prisijungimas
            </Typography>
            <form>
              <Grid maxWidth="sm" container spacing={4}>
                <CustomTextField
                  value={userInfo.email}
                  label="Įveskite el. paštą"
                  type="email"
                  onChange={handleInput}
                  name="email"
                  isError={isInputError.emailInput}
                  helperText={
                    isInputError.emailInput && inputErrorMessage.emailInput
                  }
                />
                <CustomTextField
                  value={userInfo.password}
                  label="Įveskite slaptažodį"
                  type="password"
                  onChange={handleInput}
                  name="password"
                  isError={isInputError.passwordInput}
                  helperText={
                    isInputError.passwordInput &&
                    inputErrorMessage.passwordInput
                  }
                />
                <Button
                  onClick={() => {
                    handleLogin();
                  }}
                  size="large"
                  fullWidth
                  variant="contained"
                  sx={{ p: 2 }}
                >
                  Prisijungti
                </Button>
                <Grid size={12}>
                  <Typography align="center" variant="subtitle2">
                    <Link
                      onClick={() => {
                        clearEmailError();
                        handleDialog();
                      }}
                      variant="button"
                    >
                      Pamirsau slaptažodį
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </LoginBox>
      )}

      <Dialog fullWidth={true} open={open} onClose={handleDialog}>
        <DialogTitle>Slaptažodžio atkūrimas</DialogTitle>
        <DialogContent dividers={true}>
          {isSending ? (
            <Box
              padding={10}
              display="flex"
              justifyContent="center"
              alignContent="center"
            >
              <CircularProgress disableShrink={true} size={"50%"} />
            </Box>
          ) : (
            <TextField
              value={emailAddress}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              label="Įveskite savo el. pašto adresą"
              type="text"
              name="address"
              error={isInputError.forgotPasswordEmailInput}
              helperText={
                isInputError.forgotPasswordEmailInput &&
                inputErrorMessage.forgotPasswordEmailInput
              }
            />
          )}
        </DialogContent>
        <DialogActions>
          {!isSending && (
            <ButtonGroup variant="contained" size="large" sx={{ gap: 1 }}>
              <Button onClick={handleDialog}>Uždaryti</Button>
              <Button
                color="success"
                onClick={() => {
                  sendRecoveryEmail();
                }}
                type="submit"
              >
                Atkurti
              </Button>
            </ButtonGroup>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

const LoginBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: 20,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default Login;

function CustomTextField({
  value,
  label,
  type,
  onChange,
  name,
  isError,
  helperText,
}) {
  return (
    <TextField
      value={value}
      fullWidth
      variant="filled"
      label={label}
      type={type}
      onChange={onChange}
      name={name}
      error={isError}
      helperText={isError && helperText}
    />
  );
}
