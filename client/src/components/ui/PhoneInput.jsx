import PhoneInput from "react-phone-input-2";
import { useContext } from "react";
import "react-phone-input-2/lib/style.css";
import { ModeContext } from "../../context/ModeContext";

export default function PhoneInputField({ value, onChange, name }) {
  const { isDarkMode } = useContext(ModeContext);

  return (
    <PhoneInput
      inputProps={{ required: true }}
      value={value}
      country={"lt"}
      onChange={onChange}
      name={name}
      inputStyle={{
        width: "100%",
        backgroundColor: isDarkMode ? "rgb(77, 77, 77)" : "rgb(232, 232, 232)",
        fontSize: "1rem",
        border: "none",
        color: isDarkMode ? "white" : "black",
      }}
      dropdownStyle={{
        color: isDarkMode ? "white" : "black",
        backgroundColor: isDarkMode ? "rgb(77, 77, 77)" : "rgb(232, 232, 232)",
      }}
      buttonStyle={{
        backgroundColor: isDarkMode ? "rgb(77, 77, 77)" : "rgb(232, 232, 232)",
      }}
    />
  );
}
