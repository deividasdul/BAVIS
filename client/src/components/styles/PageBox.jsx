import { styled } from "@mui/system";
import { Box } from "@mui/material";

const PageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: 20,
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default PageBox;
