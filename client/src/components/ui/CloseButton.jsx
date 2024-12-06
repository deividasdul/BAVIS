import { Button } from "@mui/material";

export default function CloseButton({ onClick, label, isFullWidth = false }) {
  return (
    <Button
      variant="outlined"
      fullWidth={isFullWidth}
      color="error"
      size="large"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
