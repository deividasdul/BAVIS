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
  TextField,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { RoomsContext } from "../../helper/RoomsContext";
import { styled } from "@mui/system";

function RoomsList() {
  const { rooms, fetchRooms, insertRoom, putRoom, deleteRoom } =
    useContext(RoomsContext);

  // Dorm id
  const { id } = useParams();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [roomId, setRoomId] = useState(0);

  const handleConfirm = () => {
    setConfirmOpen(!confirmOpen);
  };

  useEffect(() => {
    fetchRooms(id);
  }, [rooms]);

  return (
    <>
      <RoomsBox>
        <Typography variant="h2">Rekomenduojama</Typography>
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
                    >
                      Pateikti paraišką
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
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
                    >
                      Pateikti paraišką
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
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
    </>
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

export default RoomsList;
