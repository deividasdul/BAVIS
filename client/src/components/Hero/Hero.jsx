import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import LoginRounded from "@mui/icons-material/LoginRounded";

const Hero = () => {
  const navigate = useNavigate();

  const customIconStyle = {
    width: "36px",
    height: "36px",
  };

  return (
    <Fragment>
      <section>
        <div className="hero">
          <div className="hero-container">
            <h1 className="hero-title">
              Find Your <span className="room">Perfect </span>
              <span className="room">Room</span>
            </h1>
            <p className="hero-paragraph">
              Select your room based on your interests and connect with
              like-minded neighbors.
            </p>
            <div className="button-container">
              <div>
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="sign-up-btn"
                >
                  <Person2RoundedIcon sx={customIconStyle} />
                  Sign Up
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  href="/login"
                  className="log-in-btn"
                >
                  Log In
                  <LoginRounded sx={customIconStyle} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Hero;
