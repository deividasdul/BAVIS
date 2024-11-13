import React from "react";
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";
import { useTheme } from "@emotion/react";

const Footer = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        top: "auto",
        bottom: 0,
        padding: 1,
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : theme.palette.primary.main,
        color: "white",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            © {new Date().getFullYear()} BAVIS | Deividas Dulinskas
          </Typography>
          <Typography>
            <Link href="/privacy-policy" color="white" underline="hover">
              Terminai ir sąlygos
            </Link>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
