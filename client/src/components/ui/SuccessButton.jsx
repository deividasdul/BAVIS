import { Button } from "@mui/material";

export default function SuccessButton({
  onClick,
  label,
  isFullWidth = false,
  sx,
}) {
  return (
    <Button
      sx={{ p: sx && 2 }}
      size="large"
      variant="contained"
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
