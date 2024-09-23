import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardHeader,
  Button,
  Box,
  CardActions,
  CardContent,
  IconButton,
  Divider,
  TextField,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const Dorms = () => {
  const apiURL = "http://localhost:3000/api/v1/dorms";

  const [dorms, setDorms] = useState([]);
  const [currentId, setCurrentId] = useState();

  const [inputAddress, setInputAddress] = useState("");

  useEffect(() => {
    fetchDorms();
  }, [dorms]);

  const [address, setAddress] = useState("");

  const [openEdit, setOpen] = useState(false);
  const [openAdd, setAddOpen] = useState(false);

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAddChange = (e) => {
    setInputAddress(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const fetchDorms = async () => {
    try {
      const result = await axios.get(apiURL);
      setDorms(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  const insertDorm = async () => {
    const data = {
      address: inputAddress,
    };
    try {
      await axios.post(apiURL, data);
      setInputAddress("");
    } catch (e) {
      console.error(e);
    }
  };

  const deleteDorm = async (id) => {
    try {
      axios.delete(`${apiURL}/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const putDorm = async (id) => {
    const data = {
      address: address,
    };
    try {
      axios.put(`${apiURL}/${id}`, data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Grid container spacing={2}>
          {dorms.map((dorm) => {
            return (
              <Grid key={dorm.id} size={3}>
                <Card key={dorm.id} sx={{ m: 2 }} raised={true}>
                  <CardActionArea>
                    <CardHeader
                      avatar={<PlaceIcon fontSize="large" />}
                      title={dorm.address}
                      sx={{
                        "& .MuiCardHeader-avatar": {
                          color: "red",
                        },
                        "& .MuiCardHeader-title": {
                          fontSize: 20,
                        },
                      }}
                    />
                  </CardActionArea>
                  <Divider />
                  <CardContent>
                    Kambarių skaičius: {dorm.room_count}
                  </CardContent>
                  <CardActions>
                    <Button
                      href={"/rooms/" + dorm.id}
                      size="large"
                      sx={{ p: 1, m: 2 }}
                      variant="contained"
                      startIcon={<RemoveRedEyeIcon />}
                    >
                      peržiūrėti kambarius
                    </Button>
                    <IconButton
                      onClick={() => {
                        handleOpen();
                        setAddress(dorm.address);
                        setCurrentId(dorm.id);
                      }}
                      color="info"
                    >
                      <EditIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        deleteDorm(dorm.id);
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
          <Dialog open={openEdit} onClose={handleClose}>
            <DialogTitle>Bendrabučio redagavimas</DialogTitle>
            <DialogContent dividers={true}>
              <TextField
                value={address}
                onChange={handleChange}
                fullWidth
                variant="filled"
                label="Įveskite bendrabučio adresą"
                type="text"
                required
                name="address"
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
                <Button
                  onClick={() => {
                    putDorm(currentId);
                    handleClose();
                  }}
                  type="submit"
                >
                  Redaguoti
                </Button>
              </ButtonGroup>
            </DialogActions>
          </Dialog>
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
        <form method="POST" action="">
          <Dialog open={openAdd} onClose={handleAddClose}>
            <DialogTitle>Bendrabučio pridėjimas</DialogTitle>

            <DialogContent dividers={true}>
              <TextField
                value={inputAddress}
                onChange={handleAddChange}
                fullWidth
                variant="filled"
                label="Įveskite bendrabučio adresą"
                type="text"
                required
                name="address"
              ></TextField>
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
                    insertDorm();
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
};

export default Dorms;
