import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Paper,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SnackbarResponse from "../components/ui/SnackbarResponse";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import PageBox from "../components/styles/PageBox";
import CustomTextField from "../components/ui/CustomTextField";
import SuccessButton from "../components/ui/SuccessButton";
import CloseButton from "../components/ui/CloseButton";
import PhoneInputField from "../components/ui/PhoneInput";
import { setError, clearError } from "../utils/formValidation";

import { UsersContext } from "../context/UsersContext";
import { InterestsContext } from "../context/InterestsContext";
import ProtectedRoute from "../components/ProtectedRoute";

import {
  validateField,
  validatePassword,
  validatePhone,
} from "../utils/formValidation";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Profile = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [isUpdateError, setIsUpdateError] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  const navigate = useNavigate();

  const handleConfirm = () => {
    setConfirmOpen(!confirmOpen);
  };

  const {
    patchUser,
    fetchContact,
    contact,
    fetchUserInterests,
    selectedInterestIds,
    setSelectedInterestIds,
    uploadAvatar,
    avatarUrl,
    setAvatarUrl,
    deleteUser,
  } = useContext(UsersContext);

  const { user, logout } = useAuth();
  const { interests } = useContext(InterestsContext);

  const [isInputError, setIsInputError] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [inputErrorMessage, setInputErrorMessage] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleSetError = (fieldType, errorMessage) => {
    setError(setIsInputError, setInputErrorMessage, fieldType, errorMessage);
  };

  const handleClearError = (fieldType) => {
    clearError(setIsInputError, setInputErrorMessage, fieldType);
  };

  const updatePassword = async () => {
    var isError = false;

    const { newPassword, confirmNewPassword } = contactInput;

    if (validateField(newPassword.length)) {
      handleSetError("newPassword", "Slaptažodžio laukas negali būti tuščias");
      isError = true;
    } else if (!validatePassword(newPassword.length)) {
      handleSetError(
        "newPassword",
        "Slaptažodyje turi būti: bent 1 didžioji, 1 mažoji raidė, 1 simbolis ir 1 skaičius"
      );
      isError = true;
    } else {
      handleClearError("newPassword");
    }

    if (validateField(confirmNewPassword.length)) {
      handleSetError(
        "confirmNewPassword",
        "Slaptažodžio laukas negali būti tuščias"
      );
      isError = true;
    } else if (!validatePassword(confirmNewPassword.length)) {
      handleSetError(
        "confirmNewPassword",
        "Slaptažodyje turi būti: bent 1 didžioji, 1 mažoji raidė, 1 simbolis ir 1 skaičius"
      );
      isError = true;
    } else {
      handleClearError("confirmNewPassword");
    }

    if (isError) return;

    const data = {
      oldPassword: contactInput.oldPassword,
      newPassword: contactInput.newPassword,
    };

    try {
      if (newPassword !== confirmNewPassword) {
        handleSetError("newPassword", "Abu slaptažodžiai turi sutapti");
        handleSetError("confirmNewPassword", "Abu slaptažodžiai turi sutapti");
        return;
      }

      await axios.post(
        `http://localhost:3000/api/v1/users/change-password/${user.id}`,
        data
      );
      handleClearError("oldPassword");
      window.location.reload();
    } catch (e) {
      if (e.response.data.message == "Wrong password") {
        handleSetError("oldPassword", "Neteisingas senas slaptažodis");
      }
    }
  };

  const [contactInput, setContactInput] = useState({
    phoneNumber: contact.phone_number || "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInterests = (e) => {
    const { value } = e.target;
    setSelectedInterestIds(value);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setContactInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user && user.id) {
      fetchContact(user.id);
      fetchUserInterests(user.id);
    }
  }, [user]);

  useEffect(() => {
    setContactInput((prevValue) => ({
      ...prevValue,
      phoneNumber: contact.phone_number || "",
    }));

    setAvatarUrl(contact?.avatar_url);
  }, [contact]);

  return (
    <ProtectedRoute>
      <PageBox>
        <Paper elevation={12} sx={{ p: 5 }}>
          <Grid maxWidth="sm" container spacing={4}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              size={12}
            >
              <Avatar
                sx={{ width: 240, height: 240 }}
                src={avatarUrl}
                alt="Avatar"
              ></Avatar>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              size={12}
            >
              <Button
                variant="contained"
                role={undefined}
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Įkelti nuotrauką
                <VisuallyHiddenInput
                  type="file"
                  name="avatar"
                  onChange={(event) => uploadAvatar(event, user.id)}
                  multiple={false}
                  accept=".jpg,.jpeg,.png"
                />
              </Button>
            </Grid>
            <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
              <CustomTextField
                value={contact.first_name || ""}
                label="Vardas"
                type="text"
                isDisabled={true}
              />
            </Grid>
            <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
              <CustomTextField
                value={contact.last_name || ""}
                label="Pavardė"
                type="text"
                isDisabled={true}
              />
            </Grid>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel>Interesai</InputLabel>
              <Select
                multiple
                value={selectedInterestIds}
                onChange={handleInterests}
                input={<OutlinedInput />}
                renderValue={() => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selectedInterestIds.map((id) => {
                      const interest = interests.find(
                        (interest) => interest.id === id
                      );
                      return (
                        <Chip
                          key={id}
                          label={interest?.interest || "Unknown"}
                        />
                      );
                    })}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 224,
                      width: 250,
                    },
                  },
                }}
              >
                {interests.map((interest) => (
                  <MenuItem
                    key={interest.id}
                    disabled={
                      selectedInterestIds.length >= 3 &&
                      !selectedInterestIds.includes(interest.id)
                    }
                    value={interest.id}
                  >
                    {interest.interest}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <PhoneInputField
              value={contactInput.phoneNumber || ""}
              name={"phoneNumber"}
              onChange={(phone) =>
                setContactInput({ ...contactInput, phoneNumber: phone })
              }
            />
            <Grid size={12}>
              <CustomTextField
                value={contactInput.oldPassword}
                label="Senas slaptažodis"
                type="password"
                onChange={handleChange}
                name="oldPassword"
                isError={isInputError.oldPassword}
                helperText={
                  isInputError.oldPassword && inputErrorMessage.oldPassword
                }
              />
            </Grid>
            <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
              <CustomTextField
                value={contactInput.newPassword}
                label="Naujas slaptažodis"
                type="password"
                onChange={handleChange}
                name="newPassword"
                isError={isInputError.newPassword}
                helperText={
                  isInputError.newPassword && inputErrorMessage.newPassword
                }
              />
            </Grid>
            <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
              <CustomTextField
                value={contactInput.confirmNewPassword}
                label="Pakartoti naują slaptažodį"
                type="password"
                onChange={handleChange}
                name="confirmNewPassword"
                isError={isInputError.confirmNewPassword}
                helperText={
                  isInputError.confirmNewPassword &&
                  inputErrorMessage.confirmNewPassword
                }
              />
            </Grid>
            <Grid size={{ lg: 4, md: 4, sm: 4, xs: 12 }}>
              <CustomTextField
                value={contact.status || ""}
                label="Statusas"
                isDisabled={true}
              />
            </Grid>
            <Grid size={{ lg: 4, md: 4, sm: 4, xs: 12 }}>
              <CustomTextField
                value={contact.faculty || ""}
                label="Fakultetas"
                isDisabled={true}
              />
            </Grid>
            <Grid size={{ lg: 4, md: 4, sm: 4, xs: 12 }}>
              <CustomTextField
                value={contact.group || ""}
                label="Grupė"
                isDisabled={true}
              />
            </Grid>
            <SuccessButton
              onClick={(e) => {
                patchUser(
                  { ...contactInput, interests: selectedInterestIds },
                  user["id"]
                );
                setIsUpdateError(false);
                handleSnackbar();
                if (contactInput.oldPassword.length > 0) {
                  updatePassword(e);
                } else {
                  handleClearError("newPassword");
                  handleClearError("confirmNewPassword");
                }
              }}
              label="Atnaujinti"
              isFullWidth={true}
              sx
            />
            <CloseButton
              label={"Ištrinti paskyrą"}
              onClick={() => {
                handleConfirm();
              }}
              isFullWidth={true}
            />
          </Grid>
          <Dialog open={confirmOpen} onClose={handleConfirm}>
            <DialogTitle id="alert-dialog-title">
              {"Ištrinti šią paskyrą?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Teisė būti pamirštam - tai teisė tam tikromis aplinkybėmis
                pašalinti privačią informaciją apie asmenį iš interneto paieškos
                ir kitų katalogų. Ši teisė suteikia asmeniui teisę reikalauti,
                kad duomenys apie jį būtų ištrinti taip, kad jų nebegalėtų rasti
                tretieji asmenys, ypač per paieškos sistemas. Paspaudus, paskyra
                bus ištrinta iš sistemos.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleConfirm}>Atšaukti</Button>
              <Button
                variant="contained"
                color="error"
                disableElevation
                onClick={() => {
                  deleteUser(user.id);
                  handleConfirm();
                  logout();
                  navigate("/");
                }}
                autoFocus
              >
                Patvirtinti
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
        {!isUpdateError ? (
          <SnackbarResponse
            isOpen={isSnackbarOpen}
            close={handleSnackbarClose}
            severity={"success"}
            message={"Sėkmingai atnaujintas profilis"}
          />
        ) : (
          <SnackbarResponse
            isOpen={isSnackbarOpen}
            close={handleSnackbarClose}
            severity={"error"}
            message={"Nesėkmingas bandymas atnaujinti profilį"}
          />
        )}
      </PageBox>
    </ProtectedRoute>
  );
};

export default Profile;
