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
  TextField,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { RoomsContext } from "../../helper/RoomsContext";
import { styled } from "@mui/system";
import ProtectedRoute from "../ProtectedRoute.jsx";

function Rooms() {
  const apiURL = "http://localhost:3000/api/v1/rooms";

  const { rooms, fetchRooms, insertRoom, putRoom, deleteRoom } =
    useContext(RoomsContext);

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
  const [roomId, setRoomId] = useState(0);

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
  }, [rooms]);

  return (
    <ProtectedRoute>
      <RoomsBox>
        <Grid container spacing={2}>
          {rooms.map((room, _) => {
            return (
              <Grid key={room.id} size={3}>
                <Card sx={{ m: 2 }} raised={true}>
                  <CardActionArea>
                    <CardHeader title={"Kambario nr. " + room.number} />
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
                      startIcon={<MoreHorizIcon />}
                    >
                      Daugiau...
                    </Button>
                    <IconButton
                      onClick={() => {
                        handleEdit();
                        setRoomId(room.id);
                        setInput({
                          number: room.number,
                          floor: room.floor,
                          capacity: room.capacity,
                          price: room.price,
                          id: id,
                        });
                      }}
                      color="info"
                    >
                      <EditIcon fontSize="large" />
                    </IconButton>
                    <IconButton
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
            }}
            size={3}
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
              <InputTextField
                value={input.number || ""}
                onChange={handleChange}
                label="Įveskite kambario nr."
                name="number"
              />
              <InputTextField
                value={input.floor || ""}
                onChange={handleChange}
                label="Įveskite kambario aukštą"
                name="floor"
              />
              <InputTextField
                value={input.capacity || ""}
                onChange={handleChange}
                label="Įveskite maksimalų žmonių skaičių"
                name="capacity"
              />
              <InputTextField
                value={input.price || ""}
                onChange={handleChange}
                label="Įveskite kambario kainą"
                name="price"
              />
              <InputTextField
                value={input.id || ""}
                onChange={handleChange}
                label="Bendrabučio id"
                name="id"
                isDisabled={true}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <ButtonGroup
              variant="contained"
              size="large"
              sx={{ gap: 1 }}
              disableElevation
            >
              <Button onClick={handleEdit}>Uždaryti</Button>
              <Button
                onClick={() => {
                  putRoom(input, roomId);
                  handleEdit();
                }}
                type="submit"
              >
                Redaguoti
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Dialog>
        <form method="POST" action="">
          <Dialog open={addOpen} onClose={handleAddClose}>
            <DialogTitle>Kambario pridėjimas</DialogTitle>
            <DialogContent dividers={true}>
              <Grid container spacing={2}>
                <InputTextField
                  value={input.number}
                  onChange={handleAddChange}
                  label="Įveskite kambario nr."
                  name="number"
                />
                <InputTextField
                  value={input.floor}
                  onChange={handleAddChange}
                  label="Įveskite kambario aukštą"
                  name="floor"
                />
                <InputTextField
                  value={input.capacity}
                  onChange={handleAddChange}
                  label="Įveskite maksimalų žmonių skaičių"
                  name="capacity"
                />
                <InputTextField
                  value={input.price}
                  onChange={handleAddChange}
                  label="Įveskite kambario kainą"
                  name="price"
                />
                <InputTextField
                  value={input.id}
                  onChange={handleChange}
                  label="Bendrabučio id"
                  name="id"
                  isDisabled={true}
                />
              </Grid>
            </DialogContent>

            <DialogActions>
              <ButtonGroup
                variant="contained"
                size="large"
                sx={{ gap: 1 }}
                disableElevation
              >
                <Button onClick={handleAddClose}>Uždaryti</Button>
                <Button
                  color="success"
                  onClick={() => {
                    insertRoom(input);
                    handleAdd();
                  }}
                  type="submit"
                >
                  Pridėti
                </Button>
              </ButtonGroup>
            </DialogActions>
          </Dialog>
        </form>
        <Dialog
          open={confirmOpen}
          onClose={handleConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Ištrinti šį kambarį?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
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
                handleConfirm();
              }}
              autoFocus
            >
              Patvirtinti
            </Button>
          </DialogActions>
        </Dialog>
      </RoomsBox>
    </ProtectedRoute>
  );
}

const InputTextField = ({ value, onChange, label, name, isDisabled }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      label={label}
      type="number"
      required
      name={name}
      disabled={isDisabled}
    ></TextField>
  );
};

const RoomsBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default Rooms;
