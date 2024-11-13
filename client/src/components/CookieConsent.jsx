import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Typography, Paper, Link, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

import SuccessButton from "./ui/SuccessButton";
import CloseButton from "./ui/CloseButton";

const CookieConsent = () => {
  const [cookies, setCookies] = useCookies(["cookieConsent"]);
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(false);

  const giveCookieConsent = () => {
    setCookies("cookieConsent", true, { path: "/" });
  };

  const hideCookieConsent = () => {
    setIsHidden(true);
  };

  const learnMoreRedirect = () => {
    navigate("/privacy-policy");
  };

  return (
    !isHidden && (
      <Paper
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
        }}
        elevation={12}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={1}
          container={true}
        >
          <Grid size={12}>
            <Typography align="center" variant="subtitle1">
              Naudojame slapukus, kad pagerintume jūsų naudotojo patirtį. <br />
              Naudodamiesi mūsų svetaine sutinkate, kad mes naudojame slapukus.{" "}
              <br />
              <Link onClick={learnMoreRedirect}> Sužinokite daugiau.</Link>
            </Typography>
          </Grid>
          <Stack direction="row" spacing={1}>
            <SuccessButton label="Priimti" onClick={giveCookieConsent} />
            <CloseButton label="Atmesti" onClick={hideCookieConsent} />
          </Stack>
        </Grid>
      </Paper>
    )
  );
};

export default CookieConsent;
