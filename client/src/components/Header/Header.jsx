import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavigationButton from "../NavigationButton";

const Header = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h1">BAVIS</Typography>
            <Typography sx={{ flexGrow: 1 }}></Typography>
            <NavigationButton href="/" icon={<HomeIcon />} name="Home" />
            <NavigationButton href="/login" icon={<LoginIcon />} name="Login" />
            <NavigationButton
              href="/register"
              icon={<AccountCircleIcon />}
              name="Sign Up"
            />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
