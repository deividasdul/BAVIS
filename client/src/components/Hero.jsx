import { Box, Typography, Button } from "@mui/material";
import backgroundImage from "../images/cover.jpg";
import { styled } from "@mui/system";

const Hero = () => {
  return (
    <HeroBox>
      <HeaderTypography variant="h1" title="Raskite tobulą kambarį" />
      <HeaderTypography
        variant="h4"
        title="Pasirinkite kambarį pagal savo pomėgius ir bendraukite su bendraminčiais
        kaimynais"
      ></HeaderTypography>
      <Button
        href="/register"
        sx={{ p: 2, mt: 3 }}
        size="large"
        variant="contained"
      >
        Užsiregistruoti
      </Button>
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

const HeaderTypography = ({ title, variant }) => {
  return (
    <Typography
      sx={{ textShadow: "0px 0px 10px black" }}
      gutterBottom
      color="white"
      align="center"
      variant={variant}
    >
      {title}
    </Typography>
  );
};

export default Hero;
