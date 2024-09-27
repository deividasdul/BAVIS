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
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";

import { useAuth } from "../helper/AuthContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, logout, isLoggedIn, setIsLoggedIn } = useAuth();

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
            <NavButton title="Pagrindinis" href="/" icon={<HomeIcon />} />
            {!user && (
              <>
                <NavButton
                  title="Prisijungti"
                  href="/login"
                  icon={<LoginIcon />}
                />
                <NavButton
                  title="Užsiregistruoti"
                  href="/register"
                  icon={<HowToRegIcon />}
                />
              </>
            )}
            {user && user.role === "User" && (
              <NavButton
                title="Bendrabučio nuoma"
                href="/dorms-list"
                icon={<ApartmentIcon />}
              />
            )}
            {user && (
              <>
                {user.role === "Admin" && (
                  <NavButton
                    title="Administratoriaus skydelis"
                    icon={<AdminPanelSettingsIcon />}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                )}
                {user.role === "User" && (
                  <NavButton
                    title={user.email}
                    icon={<AccountCircleIcon />}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                )}
              </>
            )}
          </ButtonGroup>
          {user && user.role === "Admin" ? (
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
                <Link
                  onClick={() => {
                    logout();
                    navigate("/");
                    setIsLoggedIn(false);
                  }}
                  underline="none"
                  variant="button"
                >
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
                <Link underline="none" variant="button" href="/profile">
                  Profilis
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link underline="none" variant="button" href="/payment-history">
                  Mokėjimų istorija
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  onClick={() => {
                    logout();
                    navigate("/");
                    setIsLoggedIn(false);
                  }}
                  underline="none"
                  variant="button"
                  href="/"
                >
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

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  display: "flex",
  flexDirection: "column",

  "&.MuiButton-root:hover": {
    backgroundColor: theme.palette.info.dark,
  },
}));

const NavButton = ({ href, icon, title, onClick }) => {
  return (
    <StyledButton sx={{}} href={href} startIcon={icon} onClick={onClick}>
      {title}
    </StyledButton>
  );
};

export default Header;
