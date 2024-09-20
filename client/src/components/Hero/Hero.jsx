import React from "react";
import { Box, Typography, CssBaseline, Button } from "@mui/material";
import cover from "../../images/cover.jpg";
import Grid from "@mui/material/Grid2";
const Hero = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          minHeight: "95vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{ textShadow: "0px 0px 10px black" }}
          gutterBottom
          color="white"
          align="center"
          variant="h1"
        >
          Find Your Perfect Room
        </Typography>
        <Typography
          sx={{ textShadow: "0px 0px 10px black" }}
          gutterBottom
          color="white"
          align="center"
          variant="h4"
        >
          Select your room based on your interests and connect with like-minded
          neighbors.
        </Typography>
        <Grid sx={{ justifyContent: "center", alignItems: "center" }} container>
          <Grid size={12}>
            <Button
              href="/register"
              sx={{ p: 2 }}
              size="large"
              variant="contained"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* <section>
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
      </section> */}
    </>
  );
};

export default Hero;
