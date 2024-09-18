import React, { Fragment, useState, useEffect } from "react";
import "./Register.css";
import axios from "axios";

const Register = () => {
  //   const [userInfo, setUserInfo] = useState({
  //     email: "",
  //     password: "",
  //   });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const registerUser = (e) => {
    insertUser();

    // e.preventDefault();
  };

  const insertUser = async () => {
    const data = {
      email: email,
      password: password,
    };
    const result = await axios.post(
      "http://localhost:3000/auth/register",
      data
    );
    console.log(result.data);
  };

  return (
    <Fragment>
      <form className="register-form" action="">
        <div className="register-container">
          <label>Email:</label>
          <input
            value={email}
            name="email"
            placeholder="Email..."
            type="text"
            onChange={handleEmail}
            required
          />
          <label>Password:</label>
          <input
            value={password}
            name="password"
            placeholder="Password..."
            type="password"
            onChange={handlePassword}
            required
          />
          <button onClick={registerUser} type="submit">
            Register
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
