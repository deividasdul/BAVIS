import React from "react";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Container
        maxWidth
        sx={{
          bgcolor: "primary.dark",
          width: "100%",
          height: "5vh",
          bottom: "0",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <Typography variant="h6">
          © {new Date().getFullYear()} Deividas Dulinskas
        </Typography>
      </Container>
    </>
  );
};

export default Footer;
