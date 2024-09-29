import React, { useEffect, useState } from "react";
import { useAuth } from "../../helper/AuthContext";
import { Box, Typography, TextField, Paper, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { styled } from "@mui/system";

const Profile = () => {
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

  const { user } = useAuth();

  useEffect(() => {
    {
      if (user && user.id) fetchContact(user.id);
    }
  }, [user]);

  const [contact, setContact] = useState({});

  const [contactInput, setContactInput] = useState({
    firstName: "",
    lastName: "",
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

  if (!user) {
    return (
      <Box sx={{ minHeight: "100vh" }}>
        <Typography variant="h2">Neteisėta prieiga</Typography>
      </Box>
    );
  }

  return (
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
          <TextField
            value={contactInput.oldPassword}
            fullWidth
            variant="filled"
            label="Senas slaptažodis"
            type="password"
            onChange={handleChange}
            name="oldPassword"
          />
          <TextField
            value={contactInput.newPassword}
            fullWidth
            variant="filled"
            label="Naujas slaptažodis"
            type="password"
            onChange={handleChange}
            name="newPassword"
          />
          <TextField
            value={contactInput.confirmNewPassword}
            fullWidth
            variant="filled"
            label="Pakartoti naują slaptažodį"
            type="password"
            onChange={handleChange}
            name="confirmNewPassword"
          />
          <Button fullWidth sx={{ p: 2 }} variant="contained">
            Atnaujinti
          </Button>
        </Grid>
      </Paper>
    </ProfileBox>
  );
};

const ProfileBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default Profile;
