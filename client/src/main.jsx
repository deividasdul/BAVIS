import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.jsx";
import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./helper/AuthContext.jsx";
import { DormsProvider } from "./helper/DormsContext.jsx";
import { RoomsProvider } from "./helper/RoomsContext.jsx";

const theme = createTheme({});

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <DormsProvider>
          <RoomsProvider>
            <App />
          </RoomsProvider>
        </DormsProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
