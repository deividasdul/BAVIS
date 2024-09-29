import React, { useState } from "react";
import { Box, Paper, Typography, Button, TextField, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Error from "../Error";
import { styled } from "@mui/system";

import { useAuth } from "../../helper/AuthContext";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { login } = useAuth();

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
                  <Link onClick={() => {}} variant="button">
                    Pamirsau slaptažodį
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </LoginBox>
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
