import React, { Fragment, useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = (e) => {
    logIn();
    e.preventDefault();
  };

  const logIn = async () => {
    const data = {
      email: email,
      password: password,
    };

    try {
      const result = await axios.post("http://localhost:3000/auth/login", data);
      console.log(result);
    } catch (e) {
      console.error(e);
    }
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
          <button onClick={login} type="submit">
            Login
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
