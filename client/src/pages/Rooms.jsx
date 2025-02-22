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
  IconButton,
  CardActions,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Grid from "@mui/material/Grid2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { styled } from "@mui/system";

import { RoomsContext } from "../context/RoomsContext.jsx";
import SuccessButton from "../components/ui/SuccessButton.jsx";
import CloseButton from "../components/ui/CloseButton.jsx";
import CustomTextField from "../components/ui/CustomTextField.jsx";
import { ProtectedRouteAdmin } from "../components/ProtectedRouteAdmin.jsx";

import CloseIcon from "@mui/icons-material/Close";

import { useTheme } from "@emotion/react";
import roomImage from "../assets/room-placeholder.png";

function Rooms() {
  const { rooms, fetchRooms, insertRoom, putRoom, deleteRoom } =
    useContext(RoomsContext);

  const [refresh, setRefresh] = useState(false);

  const theme = useTheme();

  const [currentNumber, setCurrentNumber] = useState(0);
  const [tenants, setTenants] = useState([]);

  // Dorm id
  const { id } = useParams();

  const [input, setInput] = useState({
    number: 0,
    floor: 0,
    capacity: 0,
    price: 0,
    id: id,
  });
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [roomId, setRoomId] = useState(0);

  const [isInputError, setIsInputError] = useState({
    editNumber: false,
    editFloor: false,
    editCapacity: false,
    editPrice: false,
    addNumber: false,
    addFloor: false,
    addCapacity: false,
    addPrice: false,
  });

  const [inputErrorMessage, setInputErrorMessage] = useState({
    editNumber: "",
    editFloor: "",
    editCapacity: "",
    editPrice: "",
    addNumber: "",
    addFloor: "",
    addCapacity: "",
    addPrice: "",
  });

  const clearError = (fieldType) => {
    setIsInputError((prevState) => ({
      ...prevState,
      [fieldType]: false,
    }));
    setInputErrorMessage((prevValue) => ({
      ...prevValue,
      [fieldType]: "",
    }));
  };

  const setError = (fieldType, errorMessage) => {
    setIsInputError((prevState) => ({
      ...prevState,
      [fieldType]: true,
    }));
    setInputErrorMessage((prevValue) => ({
      ...prevValue,
      [fieldType]: errorMessage,
    }));
  };

  const editRoom = ({ number, floor, capacity, price }, roomId) => {
    var isError = false;

    if (number <= 0) {
      setError(
        "editNumber",
        "Kambario numerio laukas negali būti tuščias ir turi būti didesnis nei 0"
      );
      isError = true;
    } else if (number % 1 !== 0) {
      setError("editNumber", "Kambario numeris turi būti sveikasis skaičius");
      isError = true;
    } else if (currentNumber != number) {
      const existingRoom = rooms.some((room) => room.number === number);
      if (existingRoom) {
        setError("editNumber", "Šis kambario numeris jau egzistuoja");
        isError = true;
      }
    } else {
      clearError("editNumber");
    }

    if (floor <= 0) {
      setError(
        "editFloor",
        "Kambario aukšto laukas negali būti tuščias ir turi būti didesnis nei 0"
      );
      isError = true;
    } else if (floor % 1 !== 0) {
      setError("editFloor", "Kambario aukštas turi būti sveikasis skaičius");
      isError = true;
    } else {
      clearError("editFloor");
    }

    if (capacity <= 0) {
      setError(
        "editCapacity",
        "Kambario maksimalių žmonių skaičiaus laukas negali būti tuščias ir turi būti didesnis nei 0"
      );
      isError = true;
    } else if (capacity % 1 !== 0) {
      setError(
        "editCapacity",
        "Kambario maksimalių žmonių skaičiaus turi būti sveikasis skaičius"
      );
      isError = true;
    } else {
      clearError("editCapacity");
    }

    if (price <= 0) {
      setError(
        "editPrice",
        "Kambario kainos laukas negali būti tuščias ir turi būti didesnis nei 0"
      );
      isError = true;
    } else {
      clearError("editPrice");
    }

    if (isError) return;

    putRoom(input, roomId);
    setRefresh(!refresh);
    handleEdit();
  };

  const addRoom = ({ number, floor, capacity, price }) => {
    var isError = false;

    if (number <= 0) {
      setError(
        "addNumber",
        "Kambario numerio laukas negali būti tuščias ir turi būti didesnis nei 0"
      );
      isError = true;
    } else if (number % 1 !== 0) {
      setError("addNumber", "Kambario numeris turi būti sveikasis skaičius");
      isError = true;
    } else if (currentNumber != number) {
      const existingRoom = rooms.some((room) => room.number === number);
      if (existingRoom) {
        setError("addNumber", "Šis kambario numeris jau egzistuoja");
        isError = true;
      }
    } else {
      clearError("addNumber");
    }

    if (floor <= 0) {
      setError(
        "addFloor",
        "Kambario aukšto laukas negali būti tuščias ir turi būti didesnis nei 0"
      );
      isError = true;
    } else if (floor % 1 !== 0) {
      setError("addFloor", "Kambario aukštas turi būti sveikasis skaičius");
      isError = true;
    } else {
      clearError("addFloor");
    }

    if (capacity <= 0) {
      setError(
        "addCapacity",
        "Kambario maksimalių žmonių skaičiaus laukas negali būti tuščias ir turi būti didesnis nei 0"
      );
      isError = true;
    } else if (capacity % 1 !== 0) {
      setError(
        "addCapacity",
        "Kambario maksimalių žmonių skaičiaus turi būti sveikasis skaičius"
      );
      isError = true;
    } else {
      clearError("addCapacity");
    }

    if (price <= 0) {
      setError(
        "addPrice",
        "Kambario kainos laukas negali būti tuščias ir turi būti didesnis nei 0"
      );
      isError = true;
    } else {
      clearError("addPrice");
    }

    if (isError) return;

    insertRoom(input);
    setRefresh(!refresh);
    handleAdd();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setEditOpen(!editOpen);
  };

  const handleAdd = () => {
    setAddOpen(!addOpen);
  };

  const handleView = (roomTenants) => {
    setViewOpen(!viewOpen);
    setTenants(roomTenants || []);
  };

  const handleConfirm = () => {
    setConfirmOpen(!confirmOpen);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
    setInput({
      number: 0,
      floor: 0,
      capacity: 0,
      price: 0,
      id: id,
    });
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  useEffect(() => {
    fetchRooms(id);
  }, [refresh]);

  return (
    <ProtectedRouteAdmin>
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
          {rooms.map((room, _) => {
            return (
              <Grid key={room.id} size={{ lg: 4, md: 6, sm: 12, xs: 12 }}>
                <Card sx={{ m: 2 }} raised={true}>
                  <CardActionArea>
                    <CardHeader
                      sx={{
                        backgroundColor:
                          Number(room.capacity) > Number(room.tenant_amount)
                            ? theme.palette.success.light
                            : theme.palette.error.light,
                      }}
                      title={"Kambario nr. " + room.number}
                    />

                    {/* TODO: FIX IMAGES */}
                    <img style={{ width: "100%" }} src={roomImage} alt="" />
                  </CardActionArea>
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
                      color="info"
                      sx={{ p: 1, m: 1, flex: 1 }}
                      variant="contained"
                      startIcon={<MoreHorizIcon />}
                      onClick={() => {
                        handleView(room.tenants);
                      }}
                    >
                      Daugiau...
                    </Button>
                    <IconButton
                      onClick={() => {
                        setCurrentNumber(room.number);
                        handleEdit();
                        clearError("editNumber");
                        clearError("editFloor");
                        clearError("editCapacity");
                        clearError("editPrice");
                        setRoomId(room.id);
                        setInput({
                          number: room.number,
                          floor: room.floor,
                          capacity: room.capacity,
                          price: room.price,
                          id: id,
                        });
                      }}
                      color="primary"
                    >
                      <EditIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      disabled={room.tenants.length > 1 ? true : false}
                      onClick={() => {
                        setRoomId(room.id);
                        handleConfirm();
                      }}
                      color="warning"
                    >
                      <DeleteForeverIcon fontSize="large" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 10,
            }}
            size={{ lg: 4, md: 6, sm: 12, xs: 12 }}
          >
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleAddOpen}
            >
              Pridėti
            </Button>
          </Grid>
        </Grid>
        <Dialog open={editOpen} onClose={handleEdit}>
          <DialogTitle>Kambario redagavimas</DialogTitle>
          <DialogContent dividers={true}>
            <Grid container spacing={2}>
              <CustomTextField
                value={input.number || ""}
                label="Įveskite kambario nr."
                type="number"
                onChange={handleChange}
                name="number"
                isError={isInputError.editNumber}
                helperText={
                  isInputError.editNumber && inputErrorMessage.editNumber
                }
                variant="outlined"
              />
              <CustomTextField
                value={input.floor || ""}
                label="Įveskite kambario aukštą"
                type="number"
                onChange={handleChange}
                name="floor"
                isError={isInputError.editFloor}
                helperText={
                  isInputError.editFloor && inputErrorMessage.editFloor
                }
                variant="outlined"
              />
              <CustomTextField
                value={input.capacity || ""}
                label="Įveskite maksimalų žmonių skaičių"
                type="number"
                onChange={handleChange}
                name="capacity"
                isError={isInputError.editCapacity}
                helperText={
                  isInputError.editCapacity && inputErrorMessage.editCapacity
                }
                variant="outlined"
              />
              <CustomTextField
                value={input.price || ""}
                label="Įveskite kambario kainą"
                type="number"
                onChange={handleChange}
                name="price"
                isError={isInputError.editPrice}
                helperText={
                  isInputError.editPrice && inputErrorMessage.editPrice
                }
                variant="outlined"
              />
              <input disabled hidden name="id" value={input.id} />
            </Grid>
          </DialogContent>
          <DialogActions>
            <CloseButton label="Uždaryti" onClick={handleEdit} />
            <SuccessButton
              label="Redaguoti"
              onClick={() => {
                editRoom(input, roomId);
              }}
            />
          </DialogActions>
        </Dialog>
        <Dialog open={addOpen} onClose={handleAddClose}>
          <DialogTitle>Kambario pridėjimas</DialogTitle>
          <DialogContent dividers={true}>
            <Grid container spacing={2}>
              <CustomTextField
                value={input.number}
                label="Įveskite kambario nr."
                type="number"
                onChange={handleAddChange}
                name="number"
                isError={isInputError.addNumber}
                helperText={
                  isInputError.addNumber && inputErrorMessage.addNumber
                }
                variant="outlined"
              />
              <CustomTextField
                value={input.floor}
                label="Įveskite kambario aukštą"
                type="number"
                onChange={handleAddChange}
                name="floor"
                isError={isInputError.addFloor}
                helperText={isInputError.addFloor && inputErrorMessage.addFloor}
                variant="outlined"
              />
              <CustomTextField
                value={input.capacity}
                label="Įveskite maksimalų žmonių skaičių"
                type="number"
                onChange={handleAddChange}
                name="capacity"
                isError={isInputError.addCapacity}
                helperText={
                  isInputError.addCapacity && inputErrorMessage.addCapacity
                }
                variant="outlined"
              />
              <CustomTextField
                value={input.price}
                label="Įveskite kambario kainą"
                type="number"
                onChange={handleAddChange}
                name="price"
                isError={isInputError.addPrice}
                helperText={isInputError.addPrice && inputErrorMessage.addPrice}
                variant="outlined"
              />
              <input disabled hidden name="id" value={input.id} />
            </Grid>
          </DialogContent>

          <DialogActions>
            <CloseButton label="Uždaryti" onClick={handleAddClose} />
            <SuccessButton
              label="Pridėti"
              onClick={() => {
                addRoom(input);
              }}
            />
          </DialogActions>
        </Dialog>
        <Dialog open={confirmOpen} onClose={handleConfirm}>
          <DialogTitle>Ištrinti šį kambarį?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Paspaudus, pasirinktas kambarys bus ištrintas iš sistemos.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm}>Atšaukti</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteRoom(roomId);
                setRefresh(!refresh);
                handleConfirm();
              }}
              autoFocus
            >
              Patvirtinti
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog fullScreen open={viewOpen} onClose={handleView}>
          <DialogActions>
            <IconButton onClick={handleView} size="large">
              <CloseIcon fontSize="large" color="warning" />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <DialogContentText>
              {viewOpen ? (
                tenants.length >= 1 ? (
                  tenants.map((tenant, index) => {
                    return (
                      <div key={index}>
                        <h2>{index + 1}. Nuomininkas</h2>
                        {tenant.paid ? (
                          <Alert severity="error">
                            <AlertTitle>Mokėjimo būsena:</AlertTitle>
                            Nesumokėta, skola
                          </Alert>
                        ) : (
                          <Alert severity="success">
                            <AlertTitle>Mokėjimo būsena:</AlertTitle> Apmokėta
                          </Alert>
                        )}
                        <CustomTextField
                          value={tenant.first_name || ""}
                          label={"Vardas"}
                          isDisabled
                        />
                        <CustomTextField
                          value={tenant.last_name || ""}
                          label={"Pavardė"}
                          isDisabled
                        />
                        <CustomTextField
                          value={tenant.planned_arrival_date || ""}
                          label={"Atvykimo data"}
                          isDisabled
                        />
                        <CustomTextField
                          value={tenant.planned_departure_date || ""}
                          label={"Išvykimo data"}
                          isDisabled
                        />
                      </div>
                    );
                  })
                ) : (
                  <div>Šiuo metu šį kambarį nuomojančių žmonių nėra</div>
                )
              ) : null}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </RoomsBox>
    </ProtectedRouteAdmin>
  );
}

const RoomsBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default Rooms;
