import React from "react";
import { useAuth } from "../context/AuthContext";
import { Typography } from "@mui/material";
import PageBox from "./styles/PageBox";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role != "User") {
    return (
      <PageBox>
        <Typography variant="h2">Neteisėta prieiga</Typography>
      </PageBox>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
