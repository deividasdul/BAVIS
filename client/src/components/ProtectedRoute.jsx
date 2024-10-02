import React from "react";
import { useAuth } from "../helper/AuthContext";
import { Typography, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/system";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return (
      <ErrorBox>
        <Typography variant="h2">Neteisėta prieiga</Typography>
      </ErrorBox>
    );
  }

  // return React.cloneElement(children, { user });
  return <>{children}</>;
};

const ErrorBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default ProtectedRoute;
