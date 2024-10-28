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
