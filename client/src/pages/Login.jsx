import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Link,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

import { setError, clearError } from "../utils/formValidation";
import SuccessButton from "../components/ui/SuccessButton";
import CloseButton from "../components/ui/CloseButton";
import PageBox from "../components/styles/PageBox";
import CustomTextField from "../components/ui/CustomTextField";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validateField } from "../utils/formValidation";

import SnackbarResponse from "../components/ui/SnackbarResponse";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [isRecoveryError, setIsRecoveryError] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  const { login } = useAuth();

  // forgot password Dialog component state
  const [open, setOpen] = useState(false);

  const handleDialog = () => {
    setOpen(!open);
  };

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
    forgotEmail: "",
  });

  const sendRecoveryEmail = async () => {
    const { forgotEmail } = userInfo;

    if (validateField(forgotEmail)) {
      handleSetError(
        "forgotPasswordEmailInput",
        "El. pašto laukas negali būti tuščias"
      );
      return;
    }

    if (!validateEmail(forgotEmail)) {
      handleSetError(
        "forgotPasswordEmailInput",
        "Neteisingas el. pašto formatas"
      );
      return;
    }

    try {
      setIsSending(true);

      const data = {
        recipient: forgotEmail,
      };

      await axios.post("http://localhost:3000/auth/forgot-password", data);

      setTimeout(() => {
        setIsSending(false);
      }, 1000);

      setIsRecoveryError(false);
      handleSnackbar();
      handleClearError("forgotPasswordEmailInput");
      handleDialog();
    } catch (e) {
      setIsRecoveryError(true);
      handleSnackbar();
      setTimeout(() => {
        setIsSending(false);
      }, 1000);
      handleSetError(
        "forgotPasswordEmailInput",
        "Šis el. paštas mūsų sistemoje neegzistuoja"
      );
    }
  };

  const handleSetError = (fieldType, errorMessage) => {
    setError(setIsInputError, setInputErrorMessage, fieldType, errorMessage);
  };
  const handleClearError = (fieldType) => {
    clearError(setIsInputError, setInputErrorMessage, fieldType);
  };

  const handleLogin = async () => {
    const { email, password } = userInfo;

    var isError = false;

    if (validateField(email)) {
      handleSetError("emailInput", "El. pašto laukas negali būti tuščias");
      isError = true;
    } else if (!validateEmail(email)) {
      handleSetError("emailInput", "Neteisingas el. pašto formatas");
      isError = true;
    } else {
      handleClearError("emailInput");
    }

    if (validateField(password)) {
      handleSetError(
        "passwordInput",
        "Slaptažodžio laukas negali būti tuščias"
      );
      isError = true;
    } else {
      handleClearError("passwordInput");
    }

    if (isError) return;

    try {
      setIsLoading(true);
      const result = await login(userInfo);
      setIsLoading(false);
      console.log(result.user.role);
      if (result.user.role === "User") navigate("/profile");
      else navigate("/dashboard");
    } catch (e) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      handleSetError(
        "emailInput",
        "Neteisingas el. pašto adresas ir (arba) slaptažodis"
      );
      handleSetError(
        "passwordInput",
        "Neteisingas el. pašto adresas ir (arba) slaptažodis"
      );
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
        <PageBox>
          <CircularProgress disableShrink={false} size={"25%"} />
        </PageBox>
      ) : (
        <PageBox>
          <Paper sx={{ p: 5 }} elevation={12}>
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                color="warning"
                href="/register"
                variant="button"
                underline="hover"
              >
                Dar neturite paskyros? Užsiregistruokite
              </Link>
            </Stack>
            <Typography
              color="primary.main"
              align="center"
              variant="h2"
              gutterBottom
            >
              Prisijungimas
            </Typography>
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
                  isInputError.passwordInput && inputErrorMessage.passwordInput
                }
              />
              <SuccessButton
                label="Prisijungti"
                onClick={handleLogin}
                isFullWidth={true}
                sx
              />
              <Grid size={12}>
                <Typography align="center">
                  <Button
                    onClick={() => {
                      handleDialog();
                    }}
                    variant="outlined"
                    size="large"
                  >
                    Pamirsau slaptažodį
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </PageBox>
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
            <CustomTextField
              value={userInfo.forgotEmail}
              label="Įveskite savo el. pašto adresą"
              type="email"
              onChange={handleInput}
              name="forgotEmail"
              isError={isInputError.forgotPasswordEmailInput}
              helperText={
                isInputError.forgotPasswordEmailInput &&
                inputErrorMessage.forgotPasswordEmailInput
              }
              variant="outlined"
            />
          )}
        </DialogContent>
        <DialogActions>
          {!isSending && (
            <>
              <CloseButton label="Uždaryti" onClick={handleDialog} />
              <SuccessButton label="Atkurti" onClick={sendRecoveryEmail} />
            </>
          )}
        </DialogActions>
      </Dialog>

      {!isRecoveryError ? (
        <SnackbarResponse
          isOpen={isSnackbarOpen}
          close={handleSnackbarClose}
          severity={"success"}
          message={"Prašymas pakeisti slaptažodį buvo išsiųstas el. paštu"}
        />
      ) : (
        <SnackbarResponse
          isOpen={isSnackbarOpen}
          close={handleSnackbarClose}
          severity={"error"}
          message={"Nepavyko išsiųsti užklausos pakeisti slaptažodį"}
        />
      )}
    </>
  );
};

export default Login;
