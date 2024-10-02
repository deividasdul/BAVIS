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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Error from "../Error";
import { styled } from "@mui/system";
import axios from "axios";

import { useAuth } from "../../helper/AuthContext";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const [recoveryLink, setRecoveryLink] = useState("");

  const [open, setOpen] = useState(false);

  const handleDialog = () => {
    setOpen(!open);
  };

  const [address, setAddress] = useState("");

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const sendRecoveryEmail = async () => {
    const data = {
      recipient: address,
    };

    try {
      const result = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        data
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e) => {
    try {
      const data = await login(userInfo);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <>
      {isError && <Error errorMessage={errorMessage} />}
      <LoginBox>
        <Paper sx={{ p: 5 }} elevation={12}>
          <FormTitle title="Prisijungimas" />
          <form>
            <Grid maxWidth="sm" container spacing={4}>
              <InputTextField
                value={userInfo.email}
                label="Įveskite savo el. pašto adresą"
                type="email"
                onChange={handleInput}
                name="email"
              />
              <InputTextField
                value={userInfo.password}
                label="Įveskite slaptažodį"
                type="password"
                onChange={handleInput}
                name="password"
              />
              <FormButton
                onClick={(e) => {
                  handleLogin();
                }}
                text="Prisijungti"
              />
              <Grid size={12}>
                <Typography align="center" variant="subtitle1">
                  <Link
                    onClick={() => {
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
      <Dialog fullWidth={true} open={open} onClose={handleDialog}>
        <DialogTitle>Slaptažodžio atkūrimas</DialogTitle>
        <DialogContent dividers={true}>
          <TextField
            value={address}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Įveskite savo el. pašto adresą"
            type="text"
            required
            name="address"
          ></TextField>
        </DialogContent>
        <DialogActions>
          <ButtonGroup variant="contained" size="large" sx={{ gap: 1 }}>
            <Button onClick={handleDialog}>Uždaryti</Button>
            <Button
              onClick={() => {
                sendRecoveryEmail();
                handleDialog();
              }}
              type="submit"
            >
              Atkurti
            </Button>
          </ButtonGroup>
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
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const InputTextField = ({ value, label, type, onChange, name }) => {
  return (
    <TextField
      value={value}
      fullWidth
      variant="filled"
      label={label}
      type={type}
      onChange={onChange}
      name={name}
    />
  );
};

const FormTitle = ({ title }) => {
  return (
    <Typography color="primary.main" align="center" variant="h2" gutterBottom>
      {title}
    </Typography>
  );
};

const FormButton = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      size="large"
      fullWidth
      variant="contained"
      sx={{ p: 2 }}
    >
      {text}
    </Button>
  );
};

export default Login;
