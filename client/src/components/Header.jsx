import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Link,
  FormGroup,
  FormControlLabel,
  Avatar,
  Box,
  Stack,
  Drawer,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { styled } from "@mui/system";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Switch from "@mui/material/Switch";
import { ModeContext } from "../context/ModeContext";
import { useNavigate } from "react-router-dom";
import { HeaderContext } from "../context/HeaderContext";
import { UsersContext } from "../context/UsersContext";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "../assets/bavis-logo.png";
import { NotificationBar } from "./NotificationBar";

import { useTheme, useMediaQuery } from "@mui/system";

import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();

  const { isSelected } = useContext(HeaderContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const activeButtonStyle = {
    backgroundColor: theme.palette.success.main,
  };

  const { user, logout } = useAuth();
  const { handleThemeChange, isDarkMode } = useContext(ModeContext);
  const { contact, avatarUrl, setAvatarUrl, fetchContact } =
    useContext(UsersContext);

  useEffect(() => {
    if (user && user.id) {
      fetchContact(user.id);
    }
  }, [user]);

  useEffect(() => {
    setAvatarUrl(contact?.avatar_url);
  }, [contact]);

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setIsDrawerOpen(newOpen);
  };

  const adminMenuItems = [
    { id: 101, text: "Valdymo skydelis", href: "/dashboard" },
    { id: 102, text: "Bendrabučiai", href: "/dorms" },
    { id: 103, text: "Vartotojai", href: "/users" },
    { id: 104, text: "Pranešimai", href: "/notifications" },
    { id: 105, text: "Atsijungti", onClick: logout },
  ];

  const userMenuItems = [
    { id: 201, text: "Profilis", href: "/profile" },
    { id: 204, text: "Bendrabučio rezervacija", href: "/dorms-list" },
    { id: 202, text: "Mokėjimų istorija", href: "/payment-history" },
    { id: 203, text: "Atsijungti", onClick: logout },
  ];

  const renderMenuItems = (items) => {
    return items.map(({ id, text, href, onClick }) => {
      return (
        <MenuItem
          key={id}
          onClick={() => {
            if (onClick) {
              onClick();
              navigate("/");
            }
            handleClose();
          }}
        >
          <Link underline="none" variant="button" href={href}>
            {text}
            <StyledButton></StyledButton>
          </Link>
        </MenuItem>
      );
    });
  };

  return (
    <>
      <AppBar position="static" sx={{ p: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            component="img"
            sx={{
              maxWidth: 64,
              cursor: "pointer",
            }}
            alt="BAVIS logo"
            src={logo}
            onClick={() => navigate("/")}
          />
          {isMobile ? (
            <>
              <MenuIcon onClick={() => setIsDrawerOpen(true)} />
              <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
              >
                {user?.role === "Admin" && renderMenuItems(adminMenuItems)}
                {user?.role === "User" && renderMenuItems(userMenuItems)}
                {user === null && (
                  <Stack spacing={1} sx={{ p: 1 }}>
                    <StyledButton
                      variant="contained"
                      sx={isSelected.home && activeButtonStyle}
                      href="/"
                      startIcon={<HomeIcon />}
                    >
                      Pagrindinis
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      sx={isSelected.login && activeButtonStyle}
                      href="/login"
                      startIcon={<LoginIcon />}
                    >
                      Prisijungti
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      sx={isSelected.register && activeButtonStyle}
                      href="/register"
                      startIcon={<HowToRegIcon />}
                    >
                      Užsiregistruoti
                    </StyledButton>
                  </Stack>
                )}
              </Drawer>
            </>
          ) : (
            <Stack gap={2} direction={"row"}>
              <StyledButton
                variant="contained"
                sx={isSelected.home && activeButtonStyle}
                href="/"
                startIcon={<HomeIcon />}
              >
                Pagrindinis
              </StyledButton>
              {isUserLoggedOut(user) && (
                <>
                  <StyledButton
                    variant="contained"
                    sx={isSelected.login && activeButtonStyle}
                    href="/login"
                    startIcon={<LoginIcon />}
                  >
                    Prisijungti
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    sx={isSelected.register && activeButtonStyle}
                    href="/register"
                    startIcon={<HowToRegIcon />}
                  >
                    Užsiregistruoti
                  </StyledButton>
                </>
              )}
              {user && (
                <>
                  {user.role === "Admin" && (
                    <StyledButton
                      variant="contained"
                      sx={isSelected.adminPanel && activeButtonStyle}
                      startIcon={<AdminPanelSettingsIcon />}
                      onClick={handleClick}
                    >
                      Administratoriaus skydelis
                    </StyledButton>
                  )}
                  {user.role === "User" && (
                    <StyledButton
                      variant="contained"
                      sx={isSelected.userPanel && activeButtonStyle}
                      startIcon={
                        <Avatar alt="Avatar" src={avatarUrl}>
                          {contact?.first_name?.[0] + contact?.last_name?.[0]}
                        </Avatar>
                      }
                      onClick={handleClick}
                    >
                      {user.email}
                    </StyledButton>
                  )}
                </>
              )}
            </Stack>
          )}
          <FormGroup>
            <FormControlLabel
              checked={isDarkMode}
              onChange={() => {
                handleThemeChange();
              }}
              control={<MaterialUISwitch />}
            />
          </FormGroup>

          {isLoggedInAndAdmin(user) ? (
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {renderMenuItems(adminMenuItems)}
            </Menu>
          ) : (
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {renderMenuItems(userMenuItems)}
            </Menu>
          )}
        </Toolbar>
      </AppBar>
      <NotificationBar />
    </>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  display: "flex",
  flexDirection: "column",

  "&.MuiButton-root:hover": {
    backgroundColor: theme.palette.success.dark,
  },
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

export default Header;

function isLoggedInAndAdmin(user) {
  return user && user.role === "Admin";
}

function isLoggedInAndUser(user) {
  return user && user.role === "User";
}

function isUserLoggedOut(user) {
  return !user;
}
