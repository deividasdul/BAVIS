import React from "react";
import { useAuth } from "../context/AuthContext";
import PageBox from "./styles/PageBox";
import { Typography } from "@mui/material";

export const ProtectedRouteAdmin = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role != "Admin") {
    return (
      <PageBox>
        <Typography variant="h2">Neteisėta prieiga</Typography>
      </PageBox>
    );
  }

  return <>{children}</>;
};
