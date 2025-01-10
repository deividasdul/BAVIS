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
  Alert,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import utc from "dayjs/plugin/utc";

import CircleIcon from "@mui/icons-material/Circle";

import { styled } from "@mui/system";
import axios from "axios";
import StarRateIcon from "@mui/icons-material/StarRate";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useTheme } from "@emotion/react";

import { RoomsContext } from "../context/RoomsContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import SuccessButton from "../components/ui/SuccessButton";
import CloseButton from "../components/ui/CloseButton";
import CustomTextField from "../components/ui/CustomTextField";

import SnackbarResponse from "../components/ui/SnackbarResponse";
import roomImage from "../assets/room-placeholder.png";

function RoomsList() {
  const { user } = useAuth();

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

  dayjs.extend(utc);

  const [hasReserved, setHasReserved] = useState(false);

  const theme = useTheme();

  const [arrivalDate, setArrivalDate] = useState(dayjs());
  const [departureDate, setDepartureDate] = useState(dayjs());

  // Form Dialog component
  const [isRequested, setIsRequested] = useState(false);

  const handleRequest = () => {
    setIsRequested(!isRequested);
  };

  // Dorm id
  const { id } = useParams();

  const [roomId, setRoomId] = useState(0);
  const [roomNumber, setRoomNumber] = useState(0);
  const [roomFloor, setRoomFloor] = useState(0);
  const [roomPrice, setRoomPrice] = useState(0);
  const [dormAddress, setDormAddress] = useState("");

  const { rooms, fetchRooms } = useContext(RoomsContext);

  const [userInterests, setUserInterests] = useState([]);
  const [contact, setContact] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchContact = async () => {
    if (user && user.id) {
      try {
        const result = await axios.get(
          `http://localhost:3000/api/v1/users/${user.id}`
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
          `http://localhost:3000/api/v1/users/${user.id}/interests`
        );
        setUserInterests(result.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }
  };

  const fetchDorm = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/v1/dorms/dorm/${id}`
      );
      setDormAddress(result.data.address);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRooms(id);
    fetchContact();
    fetchUserInterests();
  }, [id, user]);

  useEffect(() => {
    fetchDorm(id);
  }, []);

  const checkOppositeGender = (tenants) => {
    if (!tenants || tenants.length === 0) return false;
    return tenants.some((tenant) => tenant.gender !== contact?.gender);
  };

  const checkInterestMatch = (tenantInterests, userInterests) => {
    if (!tenantInterests || !userInterests) return false;

    const userInterestIds = userInterests.map(
      (userInterest) => userInterest.interest_id
    );

    return tenantInterests.some((interestId) =>
      userInterestIds.includes(interestId)
    );
  };

  const recommendedRooms = rooms.filter((room) => {
    if (room.tenant_amount == 0) return false;

    const hasOppositeGender = checkOppositeGender(room.tenants);

    if (hasOppositeGender) return false;

    const hasInterestMatch = room.tenants.some((tenant) => {
      return checkInterestMatch(tenant.interests, userInterests);
    });

    return hasInterestMatch;
  });

  // New array of default rooms
  const defaultRooms = rooms.filter((room) => {
    if (room.tenant_amount == 0) return true;

    const isRecommended = recommendedRooms.includes(room);

    return !checkOppositeGender(room.tenants) && !isRecommended;
  });

  const postRoomReservation = async () => {
    const data = {
      userId: contact.id,
      roomId: roomId,
      plannedArrivalDate: arrivalDate.utc().format("YYYY-MM-DD"),
      plannedDepartureDate: departureDate.utc().format("YYYY-MM-DD"),
      recipient: user.email,
      address: dormAddress,
      number: roomNumber,
      floor: roomFloor,
      price: roomPrice,
    };

    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/reservation",
        data
      );
      handleSnackbar();
      handleRequest();
    } catch (e) {
      setHasReserved(true);
      console.error(e);
    }
  };

  return (
    <ProtectedRoute>
      <RoomsBox>
        <Stack direction={"row"} sx={{ m: 1 }} spacing={2}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="subtitle1"
          >
            <CircleIcon fontSize="large" color="warning" /> - Rekomenduojamas
            kambarys
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="subtitle1"
          >
            <CircleIcon fontSize="large" color="success" /> - Laisvas kambarys
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="subtitle1"
          >
            <CircleIcon fontSize="large" color="error" /> - Pilnas kambarys
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          {recommendedRooms.map((room) => (
            <Grid key={room.id} size={{ lg: 4, md: 6, sm: 12, xs: 12 }}>
              <Card sx={{ m: 2 }} raised={true}>
                <CardActionArea>
                  <CardHeader
                    sx={{ backgroundColor: theme.palette.warning.light }}
                    title={
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography variant="h5" component="span">
                          {`Kambario nr. ` + room.number}
                        </Typography>
                        <StarRateIcon
                          sx={{ color: "yellow" }}
                          fontSize="large"
                        />
                      </Box>
                    }
                  />
                  <img style={{ width: "100%" }} src={roomImage} alt="" />
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
                    onClick={() => {
                      setRoomId(room.id);
                      setRoomNumber(room.number);
                      setRoomFloor(room.floor);
                      setRoomPrice(room.price);
                      handleRequest();
                    }}
                  >
                    Pateikti paraišką
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          {defaultRooms.map((room) => {
            return (
              <Grid key={room.id} size={{ lg: 4, md: 6, sm: 12, xs: 12 }}>
                <Card sx={{ m: 2 }} raised={true}>
                  <CardActionArea>
                    <CardHeader
                      sx={{ backgroundColor: theme.palette.success.light }}
                      title={`Kambario nr. ` + room.number}
                    />
                    <img style={{ width: "100%" }} src={roomImage} alt="" />
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
                        setRoomId(room.id);
                        setRoomNumber(room.number);
                        setRoomFloor(room.floor);
                        setRoomPrice(room.price);
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
      <Dialog fullWidth={true} open={isRequested} onClose={handleRequest}>
        <DialogTitle>Kambario užklausos forma</DialogTitle>
        {hasReserved && (
          <Alert severity="error">
            Jau turite rezervaciją, palaukite, kol ji bus patikrinta
          </Alert>
        )}
        <DialogContent dividers={true}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <CustomTextField
                value={contact && contact.first_name}
                label="Vardas"
                type="text"
                name="address"
                variant="outlined"
                isDisabled={true}
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                value={contact && contact.last_name}
                label="Pavardė"
                type="text"
                name="address"
                variant="outlined"
                isDisabled={true}
              />
            </Grid>
            <CustomTextField
              value={user && user.email}
              label="El. paštas"
              type="text"
              name="address"
              variant="outlined"
              isDisabled={true}
            />
            <Grid size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={arrivalDate}
                  sx={{ width: "100%" }}
                  fullWidth={true}
                  disablePast={true}
                  name="arrivalDate"
                  label="Atvykimo data"
                  onChange={(date) => {
                    // const date = arrivalDate.format("YYYY-MM-DD");
                    setArrivalDate(date);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={departureDate}
                  sx={{ width: "100%" }}
                  fullWidth={true}
                  disablePast={true}
                  name="departure"
                  label="Išvykimo data"
                  onChange={(date) => {
                    // const date = arrivalDate.format("YYYY-MM-DD");
                    setDepartureDate(date);
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <CloseButton
            label="Uždaryti"
            onClick={() => {
              handleRequest();
            }}
          />
          <SuccessButton
            label="Pateikti"
            onClick={() => {
              postRoomReservation();
            }}
          />
        </DialogActions>
      </Dialog>
      <SnackbarResponse
        isOpen={isSnackbarOpen}
        close={handleSnackbarClose}
        severity={"success"}
        message={"Prašymas išnuomoti bendrabučio kambarį buvo sėkmingas"}
      />
    </ProtectedRoute>
  );
}

const RoomsBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default RoomsList;
