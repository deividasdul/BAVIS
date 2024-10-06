import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../helper/AuthContext";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { styled } from "@mui/system";
import { UsersContext } from "../../helper/UsersContext";
import ProtectedRoute from "../../components/ProtectedRoute";

const Profile = () => {
  const [selectedInterestIds, setSelectedInterestIds] = useState([]);
  const [selectedInterestNames, setSelectedInterestNames] = useState([]);
  const { patchUser } = useContext(UsersContext);

  const fetchContact = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/v1/users/${id}`
      );
      setContact(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUserInterests = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/v1/users/${id}/interests`
      );
      const interestIds = result.data.map((interest) => interest.interest_id);
      const interestNames = result.data.map((interest) => interest.interest);

      setSelectedInterestIds(interestIds);
      setSelectedInterestNames(interestNames);
    } catch (e) {
      console.error(e);
    }
  };

  const { user } = useAuth();

  useEffect(() => {
    if (user && user.id) {
      fetchContact(user.id);
      fetchUserInterests(user.id);
    }
  }, [user]);

  const [contact, setContact] = useState({});
  const [contactInput, setContactInput] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    setContactInput((prevValue) => ({
      ...prevValue,
      firstName: contact.first_name,
      lastName: contact.last_name,
    }));
  }, [contact]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setContactInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const [interests, setInterests] = useState([]);

  const fetchInterests = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/v1/interests");
      setInterests(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  const handleInterests = (e) => {
    const { value } = e.target;

    const names = value.map((id) => {
      const foundInterest = interests.find((interest) => interest.id === id);
      if (foundInterest) {
        return foundInterest.interest;
      } else {
        return "";
      }
    });

    setSelectedInterestIds(value);
    setSelectedInterestNames(names);
  };

  if (!user) {
    return (
      <ProfileBox>
        <Typography variant="h2">Neteisėta prieiga</Typography>
      </ProfileBox>
    );
  }

  return (
    <ProtectedRoute>
      <ProfileBox>
        <Paper elevation={12} sx={{ p: 5 }}>
          <Typography gutterBottom variant="h4">
            Sveiki, {user.email}
          </Typography>
          <Grid maxWidth="sm" container spacing={4}>
            <Grid size={6}>
              <TextField
                fullWidth
                value={contactInput.firstName || ""}
                variant="filled"
                label="Vardas"
                type="text"
                required
                onChange={handleChange}
                name="firstName"
                disabled
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                value={contactInput.lastName || ""}
                variant="filled"
                label="Pavardė"
                type="text"
                required
                onChange={handleChange}
                name="lastName"
                disabled
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
            <TextField
              value={contactInput.phoneNumber}
              fullWidth
              variant="filled"
              label="Telefono numeris"
              type="text"
              onChange={handleChange}
              name="phoneNumber"
            />
            <TextField
              value={contactInput.oldPassword}
              fullWidth
              variant="filled"
              label="Senas slaptažodis"
              type="password"
              onChange={handleChange}
              name="oldPassword"
            />
            <Grid size={6}>
              <TextField
                value={contactInput.newPassword}
                fullWidth
                variant="filled"
                label="Naujas slaptažodis"
                type="password"
                onChange={handleChange}
                name="newPassword"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                value={contactInput.confirmNewPassword}
                fullWidth
                variant="filled"
                label="Pakartoti naują slaptažodį"
                type="password"
                onChange={handleChange}
                name="confirmNewPassword"
              />
            </Grid>
            <Grid size={4}>
              <TextField
                value={contactInput.status}
                variant="filled"
                label="Statusas"
                disabled
              />
            </Grid>
            <Grid size={4}>
              <TextField
                value={contactInput.faculty}
                variant="filled"
                label="Fakultetas"
                disabled
              />
            </Grid>
            <Grid size={4}>
              <TextField
                value={contactInput.group}
                variant="filled"
                label="Grupė"
                disabled
              />
            </Grid>
            <Button
              onClick={() => {
                patchUser(selectedInterestIds, user["id"]);
              }}
              fullWidth
              sx={{ p: 2 }}
              variant="contained"
            >
              Atnaujinti
            </Button>
          </Grid>
        </Paper>
      </ProfileBox>
    </ProtectedRoute>
  );
};

const ProfileBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: 20,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default Profile;
