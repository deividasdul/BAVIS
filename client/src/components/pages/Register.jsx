import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Error from "../Error";
import { styled } from "@mui/system";

const Register = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "Vyras",
    status: "Studentas",
    faculty: "",
    group: "",
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

  const handleInput = (e) => {
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
    const {
      email,
      password,
      firstName,
      lastName,
      gender /*, number, status, faculty, group*/,
    } = userInfo;

    const data = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      // phoneNumber: number
      // status: status
      // faculty: faculty
      // group: group
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
      {isError && <Error errorMessage={errorMessage} />}
      <RegisterBox>
        <Paper sx={{ p: 8 }} elevation={12}>
          <FormTitle title="Registracija" />
          <form>
            <Grid maxWidth="sm" container spacing={4}>
              <Grid size={6}>
                <InputTextField
                  value={userInfo.firstName}
                  label="Įveskite savo vardą"
                  type="text"
                  onChange={handleInput}
                  name="firstName"
                />
              </Grid>
              <Grid size={6}>
                <InputTextField
                  value={userInfo.lastName}
                  label="Įveskite savo pavardę"
                  type="text"
                  onChange={handleInput}
                  name="lastName"
                />
              </Grid>
              <InputTextField
                value={userInfo.phoneNumber}
                label="Įveskite savo telefono numerį"
                type="text"
                onChange={handleInput}
                name="phoneNumber"
              />
              <Grid size={12}>
                <FormControl>
                  <FormLabel>Lytis</FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    value={userInfo.gender}
                    onChange={handleInput}
                  >
                    <FormControlLabel
                      value="Vyras"
                      control={<Radio />}
                      label="Vyras"
                    />
                    <FormControlLabel
                      value="Moteris"
                      control={<Radio />}
                      label="Moteris"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid size={12}>
                <FormControl>
                  <FormLabel>Statusas</FormLabel>
                  <RadioGroup
                    row
                    name="status"
                    value={userInfo.status}
                    onChange={handleInput}
                  >
                    <FormControlLabel
                      value="Studentas"
                      control={<Radio />}
                      label="Studentas"
                    />
                    <FormControlLabel
                      value="Dėstytojas"
                      control={<Radio />}
                      label="Dėstytojas"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid size={6}>
                <InputTextField
                  value={userInfo.faculty}
                  label="Įveskite savo fakultetą"
                  type="text"
                  onChange={handleInput}
                  name="faculty"
                />
              </Grid>
              <Grid size={6}>
                <InputTextField
                  value={userInfo.group}
                  label="Įveskite savo grupę"
                  type="text"
                  onChange={handleInput}
                  name="group"
                />
              </Grid>
              <InputTextField
                value={userInfo.email}
                label="Įveskite savo el. pašto adresą"
                type="email"
                onChange={handleInput}
                name="email"
                error={isInputError.emailInput}
                errorMessage={
                  isInputError.emailInput && inputErrorMessage.emailHelperText
                }
              />
              <InputTextField
                value={userInfo.password}
                label="Įveskite slaptažodį"
                type="password"
                onChange={handleInput}
                name="password"
                error={isInputError.passwordInput}
                errorMessage={
                  isInputError.passwordInput &&
                  inputErrorMessage.passwordHelperText
                }
              />
              <InputTextField
                value={userInfo.confirmPassword}
                label="Patvirtinkite slaptažodį"
                type="password"
                onChange={handleInput}
                name="confirmPassword"
                error={isInputError.confirmPasswordInput}
                errorMessage={
                  isInputError.confirmPasswordInput &&
                  inputErrorMessage.confirmPasswordHelperText
                }
              />
              <FormButton
                onClick={(e) => {
                  e.preventDefault();
                  registerUser();
                }}
                text="Užsiregistruoti"
              />
              <Grid size={12}>
                <Typography align="center" variant="subtitle1">
                  Spausdamas UŽSIREGISTRUOTI patvirtinu, kad perskaičiau ir
                  supratau terminus ir sąlygas.
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </RegisterBox>
    </>
  );
};

const RegisterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: 20,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const InputTextField = ({
  value,
  label,
  type,
  onChange,
  name,
  error,
  errorMessage,
}) => {
  return (
    <TextField
      value={value}
      fullWidth
      variant="filled"
      label={label}
      type={type}
      required
      onChange={onChange}
      name={name}
      error={error}
      helperText={error && errorMessage}
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

export default Register;
