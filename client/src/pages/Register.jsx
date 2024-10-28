import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import PageBox from "../components/styles/PageBox";
import PhoneInputField from "../components/ui/PhoneInput";
import CustomTextField from "../components/ui/CustomTextField";
import SuccessButton from "../components/ui/SuccessButton";
import { ModeContext } from "../context/ModeContext";

const groupList = ["AKRV", "ERP", "VAK", "IPU", "KT", "PS"];
const statusList = ["Studentas", "Dėstytojas", "Svečias"];
const facultyList = [
  "Alytaus",
  "Menų ir ugdymo",
  "Informatikos, inžinerijos ir technologijų",
  "Verslo",
  "Medicinos",
];

const Register = () => {
  const navigate = useNavigate();

  const { isDarkMode } = useContext(ModeContext);

  const [isStudent, setIsStudent] = useState(true);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "Vyras",
    userStatus: statusList[0],
    faculty: facultyList[0],
    userGroup: groupList[0],
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setIsStudent(userInfo.userStatus === "Studentas");

    if (userInfo.userStatus !== "Studentas") {
      setUserInfo((prev) => ({
        ...prev,
        faculty: "",
        userGroup: "",
      }));
    } else {
      setUserInfo((prev) => ({
        ...prev,
        faculty: facultyList[0],
        userGroup: groupList[0],
      }));
    }
  }, [userInfo.userStatus]);

  const [isInputError, setIsInputError] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [inputErrorMessage, setInputErrorMessage] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const clearError = (fieldType) => {
    setIsInputError((prevState) => ({
      ...prevState,
      [fieldType]: false,
    }));
    setInputErrorMessage((prevValue) => ({
      ...prevValue,
      [fieldType]: "",
    }));
  };

  const setError = (fieldType, errorMessage) => {
    setIsInputError((prevState) => ({
      ...prevState,
      [fieldType]: true,
    }));

    setInputErrorMessage((prevValue) => ({
      ...prevValue,
      [fieldType]: errorMessage,
    }));
  };

  const registerUser = async () => {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
    } = userInfo;

    var isError = false;

    if (firstName.length <= 0) {
      setError("firstName", "Vardo laukas negali būti tuščias");
      isError = true;
    } else {
      clearError("firstName");
    }

    if (lastName.length <= 0) {
      setError("lastName", "Pavardės laukas negali būti tuščias");
    } else {
      clearError("lastName");
    }

    if (phoneNumber.length <= 0) {
      setError("phoneNumber", "Telefono numerio laukas negali būti tuščias");
      isError = true;
    } else {
      clearError("phoneNumber");
    }

    if (email.length <= 0) {
      setError("email", "El. pašto laukas negali būti tuščias");
      isError = true;
    } else if (!validateEmail(email)) {
      setError("email", "Neteisingas el. pašto formatas");
      isError = true;
    } else {
      clearError("email");
    }

    if (password.length === 0) {
      setError("password", "Slaptažodžio laukas negali būti tuščias");
      isError = true;
    } else if (password.length <= 8) {
      setError("password", "Slaptažodis turi būti ilgesnis nei 8 simboliai");
      isError = true;
    } else {
      clearError("password");
    }

    if (confirmPassword.length == 0) {
      setError("confirmPassword", "Slaptažodžio laukas negali būti tuščias");
      isError = true;
    } else if (confirmPassword.length <= 8) {
      setError(
        "confirmPassword",
        "Slaptažodis turi būti ilgesnis nei 8 simboliai"
      );
      isError = true;
    } else {
      clearError("confirmPassword");
    }

    if (isError) return;

    try {
      if (password !== confirmPassword) {
        setError("password", "Abu slaptažodžiai turi sutapti");
        setError("confirmPassword", "Abu slaptažodžiai turi sutapti");
        return;
      } else {
        clearError("password");
        clearError("confirmPassword");

        const response = await insertUser();
        if (response.message === "Email address is already in use") {
          setError("email", "El. pašto adresas jau naudojamas");
          return;
        } else if (response.message === "User registered successfully") {
          navigate("/login");
        }
      }
    } catch (e) {
      console.error(e);
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
      gender,
      phoneNumber,
      userStatus,
      faculty,
      userGroup,
    } = userInfo;

    const data = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      phoneNumber: phoneNumber,
      userStatus: userStatus,
      faculty: faculty,
      userGroup: userGroup,
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
      <PageBox>
        <Paper sx={{ p: 8 }} elevation={12}>
          <Typography
            color="primary.main"
            align="center"
            variant="h2"
            gutterBottom
          >
            Registracija
          </Typography>
          <form>
            <Grid maxWidth="sm" container spacing={4}>
              <Grid size={6}>
                <CustomTextField
                  value={userInfo.firstName}
                  label="Įveskite savo vardą"
                  type="text"
                  onChange={handleInput}
                  name="firstName"
                  isError={isInputError.firstName}
                  helperText={
                    isInputError.firstName && inputErrorMessage.firstName
                  }
                />
              </Grid>
              <Grid size={6}>
                <CustomTextField
                  value={userInfo.lastName}
                  label="Įveskite savo pavardę"
                  type="text"
                  onChange={handleInput}
                  name="lastName"
                  isError={isInputError.lastName}
                  helperText={
                    isInputError.lastName && inputErrorMessage.lastName
                  }
                />
              </Grid>
              <PhoneInputField
                value={userInfo.phoneNumber}
                name={"phoneNumber"}
                onChange={(phone) =>
                  setUserInfo({ ...userInfo, phoneNumber: phone })
                }
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
              <Grid size={4}>
                <CustomFormControl
                  inputLabel="Statusas"
                  name="userStatus"
                  value={userInfo.userStatus}
                  onChange={handleInput}
                  items={statusList}
                />
              </Grid>
              <Grid size={4}>
                <CustomFormControl
                  inputLabel="Fakultetas"
                  name="faculty"
                  value={userInfo.faculty}
                  onChange={handleInput}
                  items={facultyList}
                  disabled={!isStudent}
                />
              </Grid>
              <Grid size={4}>
                <CustomFormControl
                  inputLabel="Grupė"
                  name="userGroup"
                  value={userInfo.userGroup}
                  onChange={handleInput}
                  items={groupList}
                  disabled={!isStudent}
                />
              </Grid>
              <CustomTextField
                value={userInfo.email}
                label="Įveskite savo el. pašto adresą"
                type="email"
                onChange={handleInput}
                name="email"
                isError={isInputError.email}
                helperText={isInputError.email && inputErrorMessage.email}
              />
              <Grid size={6}>
                <CustomTextField
                  value={userInfo.password}
                  label="Įveskite slaptažodį"
                  type="password"
                  onChange={handleInput}
                  name="password"
                  isError={isInputError.password}
                  helperText={
                    isInputError.password && inputErrorMessage.password
                  }
                />
              </Grid>
              <Grid size={6}>
                <CustomTextField
                  value={userInfo.confirmPassword}
                  label="Patvirtinkite slaptažodį"
                  type="password"
                  onChange={handleInput}
                  name="confirmPassword"
                  isError={isInputError.confirmPassword}
                  helperText={
                    isInputError.confirmPassword &&
                    inputErrorMessage.confirmPassword
                  }
                />
              </Grid>
              <SuccessButton
                label="Užsiregistruoti"
                onClick={registerUser}
                isFullWidth
                sx
              />
              <Grid size={12}>
                <Typography align="center" variant="subtitle1">
                  Spausdamas UŽSIREGISTRUOTI patvirtinu, kad perskaičiau ir
                  supratau{" "}
                  <Link href="/privacy-policy" underline="hover">
                    Terminai ir sąlygos
                  </Link>
                  .
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </PageBox>
    </>
  );
};

const CustomFormControl = ({
  inputLabel,
  name,
  value,
  onChange,
  items,
  disabled = false,
}) => {
  return (
    <FormControl variant="filled" sx={{ minWidth: "100%", maxWidth: "100%" }}>
      <InputLabel>{inputLabel}</InputLabel>
      <Select disabled={disabled} name={name} value={value} onChange={onChange}>
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Register;
