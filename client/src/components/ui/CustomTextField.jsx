import { TextField } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function CustomTextField({
  value,
  label,
  type,
  onChange,
  name,
  isError,
  helperText,
  variant = "filled",
  isDisabled = false,
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
      disabled={isDisabled}
    />
  );
}
