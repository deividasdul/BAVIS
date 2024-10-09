import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  CardContent,
  Button,
  CardActions,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  ButtonGroup,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { styled } from "@mui/system";
import axios from "axios";
import StarRateIcon from "@mui/icons-material/StarRate";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { RoomsContext } from "../context/RoomsContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

function RoomsList() {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  const [dates, setDates] = useState({
    arrival_date: new Date().toISOString().split("T")[0].replace(/-/g, "-"),
    departure_date: new Date().toISOString().split("T")[0].replace(/-/g, "-"),
  });

  const [isRequested, setIsRequested] = useState(false);

  const handleRequest = () => {
    setIsRequested(!isRequested);
  };

  const handleChange = () => {
    return;
  };

  // Dorm id
  const { id } = useParams();

  const { rooms, fetchRooms } = useContext(RoomsContext);
  const [userInterests, setUserInterests] = useState([]);
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContact = async () => {
    if (user && user.id) {
      try {
        const result = await axios.get(
          `http://localhost:3000/api/v1/users/${user.id}`,
        );
        setContact(result.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }
  };

  const fetchUserInterests = async () => {
    if (user && user.id) {
      try {
        const result = await axios.get(
          `http://localhost:3000/api/v1/users/${user.id}/interests`,
        );
        setUserInterests(result.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchRooms(id);
    fetchContact();
    fetchUserInterests();
  }, [id, user]);

  const checkOppositeGender = (tenants) => {
    if (!tenants || tenants.length === 0) return false;
    return tenants.some((tenant) => tenant.gender !== contact?.gender);
  };

  const checkInterestMatch = (tenantInterests, userInterests) => {
    if (!tenantInterests || !userInterests) return false;

    const userInterestIds = userInterests.map(
      (userInterest) => userInterest.interest_id,
    );

    return tenantInterests.some((interestId) =>
      userInterestIds.includes(interestId),
    );
  };

  const defaultRooms = rooms.filter((room) => {
    if (room.tenant_amount == 0) return true;

    return !checkOppositeGender(room.tenants);
  });

  const recommendedRooms = rooms.filter((room) => {
    if (room.tenant_amount == 0) return false;

    const hasOppositeGender = checkOppositeGender(room.tenants);

    if (hasOppositeGender) return false;

    const hasInterestMatch = room.tenants.some((tenant) => {
      return checkInterestMatch(tenant.interests, userInterests);
    });

    return hasInterestMatch;
  });

  return (
    <ProtectedRoute>
      <RoomsBox>
        <Typography align="center" sx={{ pt: 2 }} gutterBottom variant="h2">
          <StarRateIcon sx={{ color: "yellow" }} fontSize="large" />
          Rekomenduojama
          <StarRateIcon sx={{ color: "yellow" }} fontSize="large" />
        </Typography>
        <Grid container spacing={2}>
          {recommendedRooms.map((room) => (
            <Grid key={room.id} size={3}>
              <Card sx={{ m: 2 }} raised={true}>
                <CardActionArea>
                  <CardHeader title={`Kambario nr. ` + room.number} />
                </CardActionArea>
                <Divider />
                <CardContent>
                  <Typography gutterBottom>Aukštas: {room.floor}</Typography>
                  <Typography gutterBottom>
                    Maksimalus žmonių skaičius: {room.capacity}
                  </Typography>
                  <Typography gutterBottom>
                    Nuomojančių žmonių skaičius: {room.tenant_amount} /{" "}
                    {room.capacity}
                  </Typography>
                  <Typography>
                    Kaina: {room.price}€ <br />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="large"
                    sx={{ p: 1, m: 2 }}
                    variant="contained"
                    disabled={isLoading}
                  >
                    Pateikti paraišką
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography align="center" sx={{ pt: 4 }} gutterBottom variant="h3">
          Visi kambariai
        </Typography>
        <Grid container spacing={2}>
          {defaultRooms.map((room) => {
            return (
              <Grid key={room.id} size={3}>
                <Card sx={{ m: 2 }} raised={true}>
                  <CardActionArea>
                    <CardHeader title={`Kambario nr. ` + room.number} />
                  </CardActionArea>
                  <Divider />
                  <CardContent>
                    <Typography gutterBottom>Aukštas: {room.floor}</Typography>
                    <Typography gutterBottom>
                      Maksimalus žmonių skaičius: {room.capacity}
                    </Typography>
                    <Typography gutterBottom>
                      Nuomojančių žmonių skaičius: {room.tenant_amount} /
                      {room.capacity}
                    </Typography>
                    <Typography>
                      Kaina: {room.price}€ <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="large"
                      sx={{ p: 1, m: 2 }}
                      variant="contained"
                      onClick={() => {
                        handleRequest();
                      }}
                    >
                      Pateikti paraišką
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </RoomsBox>
      <form>
        <Dialog fullWidth={true} open={isRequested} onClose={handleRequest}>
          <DialogTitle>Kambario užklausos forma</DialogTitle>
          <DialogContent dividers={true}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  value={contact && contact.first_name}
                  variant="outlined"
                  label="Vardas"
                  type="text"
                  name="address"
                  fullWidth
                  disabled
                ></TextField>
              </Grid>
              <Grid size={6}>
                <TextField
                  value={contact && contact.last_name}
                  variant="outlined"
                  label="Pavardė"
                  type="text"
                  name="address"
                  fullWidth
                  disabled
                ></TextField>
              </Grid>
              <TextField
                value={user && user.email}
                variant="outlined"
                label="El. paštas"
                type="text"
                name="address"
                fullWidth
                disabled
              ></TextField>
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    fullWidth={true}
                    disablePast={true}
                    name="arrivalDate"
                    label="Atvykimo data"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    fullWidth={true}
                    disablePast={true}
                    name="arrivalDate"
                    label="Išvykimo data"
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <ButtonGroup
              variant="contained"
              size="large"
              sx={{ gap: 1 }}
              disableElevation
            >
              <Button color="info" onClick={handleRequest}>
                Uždaryti
              </Button>
              <Button
                color="success"
                onClick={() => {
                  // insertDorm(inputAddress);
                  handleRequest();
                }}
                type="submit"
              >
                Pateikti
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Dialog>
      </form>
    </ProtectedRoute>
  );
}

const RoomsBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default RoomsList;
