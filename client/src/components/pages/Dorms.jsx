import React, { useContext, useState } from "react";
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
  DialogContentText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { DormsContext } from "../../helper/DormsContext";

const Dorms = () => {
  const { dorms, insertDorm, putDorm, deleteDorm } = useContext(DormsContext);

  const [dormId, setDormId] = useState();
  const [inputAddress, setInputAddress] = useState("");
  const [address, setAddress] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAddChange = (e) => {
    setInputAddress(e.target.value);
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
                        handleEdit();
                        setAddress(dorm.address);
                        setDormId(dorm.id);
                      }}
                      color="info"
                    >
                      <EditIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDormId(dorm.id);
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
          <Dialog fullWidth={true} open={editOpen} onClose={handleEdit}>
            <DialogTitle>Bendrabučio redagavimas</DialogTitle>
            <DialogContent dividers={true}>
              <TextField
                value={address}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                label="Įveskite bendrabučio adresą"
                type="text"
                required
                name="address"
              ></TextField>
            </DialogContent>
            <DialogActions>
              <ButtonGroup variant="contained" size="large" sx={{ gap: 1 }}>
                <Button onClick={handleEdit}>Uždaryti</Button>
                <Button
                  onClick={() => {
                    putDorm(dormId, address);
                    handleEdit();
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
              onClick={handleAdd}
            >
              Pridėti
            </Button>
          </Grid>
        </Grid>
        <form method="POST" action="">
          <Dialog fullWidth={true} open={addOpen} onClose={handleAdd}>
            <DialogTitle>Bendrabučio pridėjimas</DialogTitle>

            <DialogContent dividers={true}>
              <TextField
                value={inputAddress}
                onChange={handleAddChange}
                fullWidth
                variant="outlined"
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
                <Button color="info" onClick={handleAdd}>
                  Uždaryti
                </Button>
                <Button
                  color="success"
                  onClick={() => {
                    insertDorm(inputAddress);
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
            {"Ištrinti šį bendrabutį?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Paspaudus, pasirinktas bendrabutis bus ištrintas iš sistemos.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm}>Atšaukti</Button>
            <Button
              variant="contained"
              color="error"
              disableElevation
              onClick={() => {
                deleteDorm(dormId);
                handleConfirm();
              }}
              autoFocus
            >
              Patvirtinti
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Dorms;
