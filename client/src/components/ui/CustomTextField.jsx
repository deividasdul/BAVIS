import { TextField } from "@mui/material";

export default function CustomTextField({
  value,
  label,
  type,
  onChange,
  name,
  isError,
  helperText,
  variant = "filled",
}) {
  return (
    <TextField
      value={value}
      fullWidth
      variant={variant}
      label={label}
      type={type}
      onChange={onChange}
      name={name}
      error={isError}
      helperText={isError && helperText}
    />
  );
}
