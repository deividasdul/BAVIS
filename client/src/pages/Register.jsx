import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
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
  Stack,
  LinearProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PageBox from "../components/styles/PageBox";
import PhoneInputField from "../components/ui/PhoneInput";
import CustomTextField from "../components/ui/CustomTextField";
import SuccessButton from "../components/ui/SuccessButton";
import { ModeContext } from "../context/ModeContext";
import {
  validateEmail,
  validateField,
  validateName,
  validatePassword,
  validatePhone,
} from "../utils/formValidation";

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

  // Password
  const [value, setValue] = React.useState("");
  const minLength = 12;

  // Captcha
  const key = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);

  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

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

    // First name validation
    if (validateField(firstName)) {
      setError("firstName", "Vardo laukas negali būti tuščias");
      isError = true;
    } else if (!validateName(firstName)) {
      setError("firstName", "Vardo lauke turi būti tik raidės");
      isError = true;
    } else {
      clearError("firstName");
    }

    // Last name validation
    if (validateField(lastName)) {
      setError("lastName", "Pavardės laukas negali būti tuščias");
      isError = true;
    } else if (!validateName(lastName)) {
      setError("lastName", "Pavardės lauke turi būti tik raidės");
      isError = true;
    } else {
      clearError("lastName");
    }

    // Email validation
    if (validateField(email)) {
      setError("email", "El. pašto laukas negali būti tuščias");
      isError = true;
    } else if (!validateEmail(email)) {
      setError("email", "Neteisingas el. pašto formatas");
      isError = true;
    } else {
      clearError("email");
    }

    //   Phone validation
    if (validateField(phoneNumber)) {
      setPhoneErrorMessage("Telefono laukas negali būti tuščias");
      isError = true;
    } else if (validatePhone(phoneNumber)) {
      setPhoneErrorMessage(
        "Telefono laukelyje turi būti daugiau nei 7 skaičiai"
      );
      isError = true;
    } else {
      setPhoneErrorMessage("");
    }

    // Password validation
    if (validateField(password)) {
      setError("password", "Slaptažodžio laukas negali būti tuščias");
      isError = true;
    } else if (!validatePassword(password)) {
      setError(
        "password",
        "Slaptažodyje turi būti: bent 1 didžioji, 1 mažoji raidė, 1 simbolis ir 1 skaičius"
      );
      isError = true;
    } else {
      clearError("password");
    }

    // Confirm password validation
    if (validateField(confirmPassword)) {
      setError("confirmPassword", "Slaptažodžio laukas negali būti tuščias");
      isError = true;
    } else if (!validatePassword(confirmPassword)) {
      setError(
        "confirmPassword",
        "Slaptažodyje turi būti: bent 1 didžioji, 1 mažoji raidė, 1 simbolis ir 1 skaičius"
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
              <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
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
              <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
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
              <Typography
                sx={{ mt: -3, mr: "14px", ml: "14px" }}
                color="error"
                variant="caption"
              >
                {phoneErrorMessage}
              </Typography>
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
              <Grid size={{ lg: 4, md: 4, sm: 4, xs: 12 }}>
                <CustomFormControl
                  inputLabel="Statusas"
                  name="userStatus"
                  value={userInfo.userStatus}
                  onChange={handleInput}
                  items={statusList}
                />
              </Grid>
              <Grid size={{ lg: 4, md: 4, sm: 4, xs: 12 }}>
                <CustomFormControl
                  inputLabel="Fakultetas"
                  name="faculty"
                  value={userInfo.faculty}
                  onChange={handleInput}
                  items={facultyList}
                  disabled={!isStudent}
                />
              </Grid>
              <Grid size={{ lg: 4, md: 4, sm: 4, xs: 12 }}>
                <CustomFormControl
                  inputLabel="Grupė"
                  name="userGroup"
                  value={userInfo.userGroup}
                  onChange={handleInput}
                  items={groupList}
                  disabled={!isStudent}
                />
              </Grid>
              <Grid size={12}>
                <CustomTextField
                  value={userInfo.email}
                  label="Įveskite savo el. pašto adresą"
                  type="email"
                  onChange={handleInput}
                  name="email"
                  isError={isInputError.email}
                  helperText={isInputError.email && inputErrorMessage.email}
                />
              </Grid>
              <Grid size={{ md: 6, sm: 6, xs: 12 }}>
                <Stack spacing={0.5}>
                  <CustomTextField
                    value={userInfo.password}
                    label="Įveskite slaptažodį"
                    type="password"
                    onChange={(event) => {
                      handleInput(event);
                      setValue(event.target.value);
                    }}
                    name="password"
                    isError={isInputError.password}
                    helperText={
                      isInputError.password && inputErrorMessage.password
                    }
                  />
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((value.length * 100) / minLength, 100)}
                    sx={{
                      bgcolor: "background.default",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: `hsl(${Math.min(value.length * 10, 120)}, 80%, 40%)`,
                      },
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    align="right"
                    sx={{
                      color: `hsl(${Math.min(value.length * 10, 120)}, 80%, 60%)`,
                    }}
                  >
                    {value.length < 3 && "Labai silpnas"}
                    {value.length >= 3 && value.length < 6 && "Silpnas"}
                    {value.length >= 6 && value.length < 10 && "Stiprus"}
                    {value.length >= 10 && "Labai stiprus"}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ md: 6, sm: 6, xs: 12 }}>
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
              <ReCAPTCHA
                sitekey={key}
                onChange={() => {
                  setIsCaptchaChecked(true);
                }}
              />
              <SuccessButton
                isDisabled={!isCaptchaChecked}
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
