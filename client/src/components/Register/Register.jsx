import React, { Fragment, useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const response = await insertUser();
        if (response.message === "Email address is already in use") {
          setError(true);
          setErrorMessage(response.message);
        } else if (response.message === "Student registered successfully") {
          navigate("/login");
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setError(true);
      setErrorMessage("Both passwords must match ");
    }
  };

  const insertUser = async () => {
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

  const customStyle = {
    color: "white",
    width: "46px",
    height: "46px",
    marginRight: "10px",
  };

  return (
    <>
      {error && <Error errorMessage={errorMessage} />}
      <form className="register-form" action="">
        <div className="register-container">
          <h2 className="title">REGISTRATION</h2>
          <label>Enter your email address:</label>
          <div className="input-field">
            <AlternateEmailIcon sx={customStyle} />
            <input
              value={email}
              name="email"
              placeholder="Email..."
              type="text"
              onChange={handleEmail}
              required
            />
          </div>
          <label>Enter your password:</label>
          <div className="input-field">
            <PasswordIcon sx={customStyle} />
            <input
              value={password}
              name="password"
              placeholder="Password..."
              type="password"
              onChange={handlePassword}
              required
            />
          </div>
          <p className="text">Password must be at least 8 characters long*</p>
          <label>Confirm your password:</label>
          <div className="input-field">
            <PasswordIcon sx={customStyle} />
            <input
              value={confirmPassword}
              name="password"
              placeholder="Confirm password..."
              type="password"
              onChange={handleConfirmPassword}
              required
            />
          </div>
          <button
            className="register-button"
            onClick={registerUser}
            type="submit"
          >
            Create Account
          </button>
          <p className="text">
            By clicking Create Account, I state that I have read and understood
            the terms and conditions.
          </p>
          <h2 className="text">Or</h2>
          <a class="google-btn" href="/google" role="button">
            <GoogleIcon sx={{ mr: 1 }} />
            Sign Up with Google
          </a>
        </div>
      </form>
    </>
  );
};

export default Register;
