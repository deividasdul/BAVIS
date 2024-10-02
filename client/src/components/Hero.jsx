import { Box, Typography, Button } from "@mui/material";
import backgroundImage from "../images/cover.jpg";
import { styled } from "@mui/system";

const Hero = () => {
  return (
    <HeroBox>
      <HeaderTypography variant="h1">Raskite tobulą kambarį</HeaderTypography>
      <HeaderTypography variant="h4">
        Pasirinkite kambarį pagal savo pomėgius ir bendraukite su bendraminčiais
        kaimynais
      </HeaderTypography>
      <RegisterButton href="/register" size="large" variant="contained">
        Užsiregistruoti
      </RegisterButton>
    </HeroBox>
  );
};

const HeroBox = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const HeaderTypography = styled(Typography)(({ theme }) => ({
  textShadow: "0px 0px 10px black",
  color: "white",
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

export default Hero;
