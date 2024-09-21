import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  ButtonGroup,
  Link,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
      <AppBar position="static" sx={{ p: 1 }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} variant="h3">
            BAVIS
          </Typography>
          <ButtonGroup sx={{ ml: 2, gap: 1 }} size="large" variant="container">
            <Button
              sx={{ bgcolor: "info.main" }}
              href="/"
              startIcon={<HomeIcon />}
            >
              Pagrindinis
            </Button>
            <Button
              sx={{ bgcolor: "info.main" }}
              href="/login"
              startIcon={<LoginIcon />}
            >
              Prisijungti
            </Button>
            <Button
              sx={{ bgcolor: "info.main" }}
              href="/register"
              startIcon={<AccountCircleIcon />}
            >
              Užsiregistruoti
            </Button>
            <Button
              sx={{ bgcolor: "info.main" }}
              href="/logout"
              startIcon={<LogoutIcon />}
            >
              Atsijungti
            </Button>
            <Button
              sx={{ bgcolor: "info.main" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              startIcon={<AdminPanelSettingsIcon />}
            >
              Administratorius skydelis
            </Button>
          </ButtonGroup>
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
                Bendrabučiai
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
