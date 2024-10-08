import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const Footer = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : theme.palette.primary.main,
        color: "white",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          © {new Date().getFullYear()} Deividas Dulinskas
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
