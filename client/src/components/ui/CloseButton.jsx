import { Button } from "@mui/material";

export default function CloseButton({ onClick, label }) {
  return (
    <Button variant="outlined" color="error" size="large" onClick={onClick}>
      {label}
    </Button>
  );
}
