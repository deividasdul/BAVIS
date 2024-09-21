import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.jsx";
import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";

const theme = createTheme({});

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
