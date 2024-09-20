import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  Link,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavigationButton from "../NavigationButton";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h2">BAVIS</Typography>
            <Typography sx={{ flexGrow: 1 }}></Typography>
            <NavigationButton href="/" icon={<HomeIcon />} name="Home" />
            <NavigationButton href="/login" icon={<LoginIcon />} name="Login" />
            <NavigationButton
              href="/register"
              icon={<AccountCircleIcon />}
              name="Sign Up"
            />
            <NavigationButton
              href="/logout"
              icon={<LogoutIcon />}
              size="large"
              name="Logout"
            ></NavigationButton>
            <Button
              color="info"
              id="basic-button"
              variant="contained"
              size="large"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              startIcon={<AdminPanelSettingsIcon />}
            >
              Admin
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link underline="none" variant="button" href="/dorms">
                  Dormitories
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
