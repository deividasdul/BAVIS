import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Link,
  Alert,
  AlertTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <>
      {isError && (
        <Alert variant="filled" severity="error" color="error">
          Error
          <AlertTitle>{errorMessage}</AlertTitle>
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
            Prisijungimas
          </Typography>
          <form action="">
            <Grid maxWidth="sm" sx={{ p: 5 }} container spacing={4}>
              <Grid size={12}>
                <TextField
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
                  fullWidth
                  variant="filled"
                  label="Įveskite slaptažodį"
                  type="password"
                  required
                  onChange={handleUserInput}
                  name="password"
                ></TextField>
              </Grid>
              <Button
                size="large"
                fullWidth
                variant="contained"
                sx={{ p: 2 }}
                onClick={() => {
                  {
                    return;
                  }
                }}
              >
                Prisijungti
              </Button>
              <Grid size={2}></Grid>
              <Grid size={8}>
                <Typography align="center" variant="subtitle1">
                  <Link variant="button">Pamirsau slaptažodį</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
