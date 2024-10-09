import React from "react";
import { useAuth } from "../context/AuthContext";
import { Typography, CircularProgress, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/system";
import PageBox from "./styles/PageBox";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageBox>
        <Skeleton
          sx={{ bgcolor: "grey.900", minHeight: "100vh", minWidth: "100vh" }}
          variant="rectangular"
          width={210}
          height={118}
        />
        {/* <CircularProgress variant="determinate" value={25} size={"25%"} /> */}
      </PageBox>
    );
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
