import React from "react";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          bgcolor: "primary.dark",
          height: "5vh",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
