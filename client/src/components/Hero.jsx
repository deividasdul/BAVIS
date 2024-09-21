import React from "react";
import { Box, Typography, Button } from "@mui/material";
import backgroundImage from "../images/cover.jpg";
import Grid from "@mui/material/Grid2";

const Hero = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography
          sx={{ textShadow: "0px 0px 10px black" }}
          gutterBottom
          color="white"
          align="center"
          variant="h1"
        >
          Raskite tobulą kambarį
        </Typography>
        <Typography
          sx={{ textShadow: "0px 0px 10px black" }}
          gutterBottom
          color="white"
          align="center"
          variant="h4"
        >
          Pasirinkite kambarį pagal savo pomėgius ir bendraukite su
          bendraminčiais kaimynais
        </Typography>
        <Grid>
          <Grid>
            <Button
              href="/register"
              sx={{ p: 2 }}
              size="large"
              variant="contained"
            >
              Užsiregistruoti
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Hero;
