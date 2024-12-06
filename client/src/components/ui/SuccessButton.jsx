import { Button } from "@mui/material";

export default function SuccessButton({
  onClick,
  label,
  isFullWidth = false,
  isDisabled = false,
  sx,
}) {
  return (
    <Button
      sx={{ p: sx && 2 }}
      size="large"
      variant="contained"
      disabled={isDisabled}
      fullWidth={isFullWidth}
      color="success"
      onClick={() => {
        onClick();
      }}
    >
      {label}
    </Button>
  );
}
