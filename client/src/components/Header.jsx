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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const [isAdmin, setIsAdmin] = useState(true);

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
              sx={{
                bgcolor: "info.main",
                display: "flex",
                flexDirection: "column",
              }}
              href="/"
              startIcon={<HomeIcon />}
            >
              Pagrindinis
            </Button>
            <Button
              sx={{
                bgcolor: "info.main",
                display: "flex",
                flexDirection: "column",
              }}
              href="/login"
              startIcon={<LoginIcon />}
            >
              Prisijungti
            </Button>
            <Button
              sx={{
                bgcolor: "info.main",
                display: "flex",
                flexDirection: "column",
              }}
              href="/register"
              startIcon={<AccountCircleIcon />}
            >
              Užsiregistruoti
            </Button>
            {isAdmin ? (
              <Button
                sx={{
                  bgcolor: "info.main",
                  display: "flex",
                  flexDirection: "column",
                }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={<AdminPanelSettingsIcon />}
              >
                Administratorius skydelis
              </Button>
            ) : (
              <Button
                sx={{
                  bgcolor: "info.main",
                  display: "flex",
                  flexDirection: "column",
                }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={<AccountCircleIcon />}
              >
                Vartotojo profilis
              </Button>
            )}
          </ButtonGroup>
          {isAdmin ? (
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
              <MenuItem onClick={handleClose}>
                <Link underline="none" variant="button" href="/users">
                  Vartotojai
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link underline="none" variant="button" href="/notifications">
                  Pranešimai
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link underline="none" variant="button" href="/logout">
                  Atsijungti
                </Link>
              </MenuItem>
            </Menu>
          ) : (
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
                  Profilis
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link underline="none" variant="button" href="/logout">
                  Atsijungti
                </Link>
              </MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
