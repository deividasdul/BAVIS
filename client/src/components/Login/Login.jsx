import React, { useState } from "react";
import AuthForm from "../AuthForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  return (
    <>
      <AuthForm
        isRegister={false}
        btnSubmitTitle="LOGIN"
        formTitle="Log in"
        userInfo={userInfo}
        handleUserInput={handleUserInput}
        submit={() => {
          return;
        }}
      ></AuthForm>
    </>
  );
};

export default Login;
