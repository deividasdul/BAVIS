import React, { useState } from "react";
import AuthForm from "../AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    const { email, password, confirmPassword } = userInfo;

    if (validateEmail(email)) {
      if (password.length <= 8 || confirmPassword.length <= 8) {
        setError(true);
        setErrorMessage("The password must be longer than 8 characters");
      } else {
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
          }
        } else {
          setError(true);
          setErrorMessage("Both passwords must match");
        }
      }
    } else {
      setError(true);
      setErrorMessage("Incorrect format of email");
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
      <AuthForm
        isRegister={true}
        btnSubmitTitle="CREATE ACCOUNT"
        formTitle="Create an account"
        userInfo={userInfo}
        handleUserInput={handleUserInput}
        submit={registerUser}
        errorMessage={errorMessage}
        error={error}
      ></AuthForm>
    </>
  );
};

export default Register;
