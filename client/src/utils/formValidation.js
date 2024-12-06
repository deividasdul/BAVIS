export const clearError = (
  setIsInputError,
  setInputErrorMessage,
  fieldType
) => {
  setIsInputError((prevState) => ({
    ...prevState,
    [fieldType]: false,
  }));
  setInputErrorMessage((prevValue) => ({
    ...prevValue,
    [fieldType]: "",
  }));
};

export const setError = (
  setIsInputError,
  setInputErrorMessage,
  fieldType,
  errorMessage
) => {
  setIsInputError((prevState) => ({
    ...prevState,
    [fieldType]: true,
  }));
  setInputErrorMessage((prevValue) => ({
    ...prevValue,
    [fieldType]: errorMessage,
  }));
};

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const validateName = (name) => {
  const nameRegex = /^[\p{L}]+$/u;
  return nameRegex.test(name);
};

export const validateField = (input) => {
  return input.length == 0;
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{12,36}$/;
  return passwordRegex.test(password);
};

export const validatePhone = (phoneNumber) => {
  return phoneNumber.length < 7;
};
