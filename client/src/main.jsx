import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.jsx";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./helper/AuthContext.jsx";
import { DormsProvider } from "./helper/DormsContext.jsx";
import { RoomsProvider } from "./helper/RoomsContext.jsx";
import { ModeProvider } from "./helper/ModeContext.jsx";
import { UsersProvider } from "./helper/UsersContext.jsx";

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
  </StrictMode>
);
