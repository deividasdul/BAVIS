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
  Typography,
  Paper,
  Button,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import PageBox from "../components/styles/PageBox";
import CustomTextField from "../components/ui/CustomTextField";
import SuccessButton from "../components/ui/SuccessButton";

import { UsersContext } from "../context/UsersContext";
import { InterestsContext } from "../context/InterestsContext";
import ProtectedRoute from "../components/ProtectedRoute";

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
  const {
    patchUser,
    fetchContact,
    contact,
    fetchUserInterests,
    selectedInterestIds,
    setSelectedInterestIds,
  } = useContext(UsersContext);

  const { user } = useAuth();
  const { interests } = useContext(InterestsContext);

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
  }, [contact]);

  if (!user) {
    return (
      <PageBox>
        <Typography variant="h2">Neteisėta prieiga</Typography>
      </PageBox>
    );
  }

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
                src={contact?.avatar_url}
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
                  onChange={(event) => console.log(event.target.files[0].name)}
                  multiple={false}
                />
              </Button>
            </Grid>

            <Grid size={6}>
              <CustomTextField
                value={contact.first_name || ""}
                label="Vardas"
                type="text"
                isDisabled={true}
              />
            </Grid>
            <Grid size={6}>
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
            <CustomTextField
              value={contactInput.phoneNumber || ""}
              label="Telefono numeris"
              type="text"
              onChange={handleChange}
              name="phoneNumber"
            />
            <CustomTextField
              value={contactInput.oldPassword}
              label="Senas slaptažodis"
              type="password"
              onChange={handleChange}
              name="oldPassword"
            />
            <Grid size={6}>
              <CustomTextField
                value={contactInput.newPassword}
                label="Naujas slaptažodis"
                type="password"
                onChange={handleChange}
                name="newPassword"
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                value={contactInput.confirmNewPassword}
                label="Pakartoti naują slaptažodį"
                type="password"
                onChange={handleChange}
                name="confirmNewPassword"
              />
            </Grid>
            <Grid size={4}>
              <CustomTextField
                value={contact.status || ""}
                label="Statusas"
                isDisabled={true}
              />
            </Grid>
            <Grid size={4}>
              <CustomTextField
                value={contact.faculty || ""}
                label="Fakultetas"
                isDisabled={true}
              />
            </Grid>
            <Grid size={4}>
              <CustomTextField
                value={contact.group || ""}
                label="Grupė"
                isDisabled={true}
              />
            </Grid>
            <SuccessButton
              onClick={() => {
                patchUser(
                  { ...contactInput, interests: selectedInterestIds },
                  user["id"]
                );
              }}
              label="Atnaujinti"
              isFullWidth={true}
              sx
            />
          </Grid>
        </Paper>
      </PageBox>
    </ProtectedRoute>
  );
};

export default Profile;
