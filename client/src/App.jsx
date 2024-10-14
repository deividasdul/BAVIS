import React, { useContext, useMemo } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { ModeContext } from "./context/ModeContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Rooms from "./pages/Rooms.jsx";
import Dorms from "./pages/Dorms.jsx";
import Users from "./pages/Users.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import DormsList from "./pages/DormsList.jsx";
import RoomsList from "./pages/RoomsList.jsx";
import Notifications from "./pages/Notifications.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import { HeaderProvider } from "./context/HeaderContext.jsx";
import CookieConsent from "./components/CookieConsent.jsx";

import { useCookies } from "react-cookie";

const App = () => {
  const { isDarkMode } = useContext(ModeContext);
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: isDarkMode ? "dark" : "light",
      },
    });
  }, [isDarkMode]);

  const [cookies] = useCookies(["cookieConsent"]);

  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <ThemeProvider theme={theme}>
      <HeaderProvider>
        {!isDashboard && <Header />}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dorms" element={<Dorms />} />
          <Route path="/rooms/:id" element={<Rooms />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dorms-list" element={<DormsList />} />
          <Route path="/rooms-list/:id" element={<RoomsList />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!isDashboard && <Footer />}
        {!cookies.cookieConsent && <CookieConsent />}
      </HeaderProvider>
    </ThemeProvider>
  );
};

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
