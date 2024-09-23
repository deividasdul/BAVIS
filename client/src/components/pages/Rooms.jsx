import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Rooms() {
  const apiURL = "http://localhost:3000/api/v1/rooms";

  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [openAdd, setAddOpen] = useState(false);
  const [openEdit, setOpen] = useState(false);

  const [input, setInput] = useState({
    number: 0,
    floor: 0,
    capacity: 0,
    price: 0,
  });

  const insertRoom = async () => {
    const data = {
      number: input.number,
      floor: input.floor,
      capacity: input.capacity,
      price: input.price,
      dormitory_id: id,
    };

    try {
      await axios.post("apiURL", data);
      setInput({
        number: 0,
        floor: 0,
        capacity: 0,
        price: 0,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddChange = (e) => {
    const { value, name } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleAddOpen = () => {
    setAddOpen(true);
    setInput({
      number: 0,
      floor: 0,
      capacity: 0,
      price: 0,
    });
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  useEffect(() => {
    fetchRooms();
  }, [rooms]);

  const fetchRooms = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/v1/dorms/${id}`
      );
      setRooms(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
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
                      Daugiau informacijos
                    </Button>
                    <IconButton
                      onClick={() => {
                        handleOpen();
                        setInput({
                          number: room.number,
                          floor: room.floor,
                          capacity: room.capacity,
                          price: room.price,
                        });
                      }}
                      color="info"
                    >
                      <EditIcon fontSize="large" />
                    </IconButton>
                    <IconButton color="warning">
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
        <Dialog open={openEdit} onClose={handleClose}>
          <DialogTitle>Kambario redagavimas</DialogTitle>
          <DialogContent dividers={true}>
            <TextField
              value={input.number}
              onChange={handleChange}
              fullWidth
              variant="filled"
              label="Įveskite kambario nr."
              type="number"
              required
              name="number"
            ></TextField>
            <TextField
              value={input.floor}
              onChange={handleChange}
              fullWidth
              variant="filled"
              label="Įveskite kambario aukštą"
              type="number"
              required
              name="floor"
            ></TextField>
            <TextField
              value={input.capacity}
              onChange={handleChange}
              fullWidth
              variant="filled"
              label="Įveskite maksimalų žmonių skaičių"
              type="number"
              required
              name="capacity"
            ></TextField>
            <TextField
              value={input.price}
              onChange={handleChange}
              fullWidth
              variant="filled"
              label="Įveskite kambario kainą"
              type="number"
              required
              name="price"
            ></TextField>
            <TextField
              value={id}
              fullWidth
              variant="filled"
              label="Įveskite kambario kainą"
              type="number"
              required
              disabled
              name="price"
            ></TextField>
          </DialogContent>
          <DialogActions>
            <ButtonGroup
              variant="contained"
              size="large"
              sx={{ gap: 1 }}
              disableElevation
            >
              <Button onClick={handleClose}>Uždaryti</Button>
              <Button onClick={handleClose} type="submit">
                Redaguoti
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Dialog>
        <form method="POST" action="">
          <Dialog open={openAdd} onClose={handleAddClose}>
            <DialogTitle>Kambario pridėjimas</DialogTitle>
            <DialogContent dividers={true}>
              <TextField
                value={input.number}
                onChange={handleAddChange}
                fullWidth
                variant="filled"
                label="Įveskite kambario nr."
                type="number"
                required
                name="number"
              ></TextField>
              <TextField
                value={input.floor}
                onChange={handleAddChange}
                fullWidth
                variant="filled"
                label="Įveskite kambario aukštą"
                type="number"
                required
                name="floor"
              ></TextField>
              <TextField
                value={input.capacity}
                onChange={handleAddChange}
                fullWidth
                variant="filled"
                label="Įveskite maksimalų žmonių skaičių"
                type="number"
                required
                name="capacity"
              ></TextField>
              <TextField
                value={input.price}
                onChange={handleAddChange}
                fullWidth
                variant="filled"
                label="Įveskite kambario kainą"
                type="number"
                required
                name="price"
              ></TextField>
              <input hidden value={id} name="id" type="text" />
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
                  onClick={() => {
                    insertRoom();
                    handleAddClose();
                  }}
                  type="submit"
                >
                  Pridėti
                </Button>
              </ButtonGroup>
            </DialogActions>
          </Dialog>
        </form>
      </Box>
    </>
  );
}

export default Rooms;
