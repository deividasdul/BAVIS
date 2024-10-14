import React from "react";
import { useCookies } from "react-cookie";
import { Typography, Paper, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

import SuccessButton from "./ui/SuccessButton";

const CookieConsent = () => {
  const [cookies, setCookies] = useCookies(["cookieConsent"]);
  const navigate = useNavigate();

  const giveCookieConsent = () => {
    setCookies("cookieConsent", true, { path: "/" });
  };

  const learnMoreRedirect = () => {
    navigate("/privacy-policy");
  };

  return (
    <Paper
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      elevation={12}
    >
      <Grid container={true}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size={11}
        >
          <Typography align="center" variant="subtitle1">
            Naudojame slapukus, kad pagerintume jūsų naudotojo patirtį. <br />
            Naudodamiesi mūsų svetaine sutinkate, kad mes naudojame slapukus.{" "}
            <br />
            <Link onClick={learnMoreRedirect}> Sužinokite daugiau.</Link>
          </Typography>
        </Grid>
        <Grid size={1}>
          <SuccessButton label="Priimti" onClick={giveCookieConsent} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CookieConsent;
