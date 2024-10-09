import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext.jsx";
import { DormsProvider } from "./context/DormsContext.jsx";
import { RoomsProvider } from "./context/RoomsContext.jsx";
import { ModeProvider } from "./context/ModeContext.jsx";
import { UsersProvider } from "./context/UsersContext.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <CssBaseline />
    <AuthProvider>
      <DormsProvider>
        <RoomsProvider>
          <ModeProvider>
            <UsersProvider>
              <App />
            </UsersProvider>
          </ModeProvider>
        </RoomsProvider>
      </DormsProvider>
    </AuthProvider>
  </StrictMode>,
);
