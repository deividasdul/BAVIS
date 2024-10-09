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
import { styled } from "@mui/system";

import { DormsContext } from "../context/DormsContext";
import ProtectedRoute from "../components/ProtectedRoute";
import SuccessButton from "../components/ui/SuccessButton";
import CloseButton from "../components/ui/CloseButton";
import CustomTextField from "../components/ui/CustomTextField";

const Dorms = () => {
  const { dorms, insertDorm, putDorm, deleteDorm } = useContext(DormsContext);

  const [dormId, setDormId] = useState();
  const [inputAddress, setInputAddress] = useState("");
  const [address, setAddress] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [isInputError, setIsInputError] = useState({
    editAddress: false,
    addAddress: false,
  });

  const [inputErrorMessage, setInputErrorMessage] = useState({
    editAddress: "",
    addAddress: "",
  });

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

  const editDorm = (dormId, address) => {
    if (address.length <= 0) {
      setError("editAddress", "Bendrabučio adreso laukas negali būti tuščias");
      return;
    } else {
      clearError("editAddress");
      putDorm(dormId, address);
      handleEdit();
    }
  };

  const addDorm = (inputAddress) => {
    if (inputAddress.length <= 0) {
      setError("addAddress", "Bendrabučio adreso laukas negali būti tuščias");
      return;
    } else {
      clearError("addAddress");
      insertDorm(inputAddress);
      setInputAddress("");
      handleAdd();
    }
  };

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
    <ProtectedRoute>
      <DormsBox sx={{ minHeight: "100vh" }}>
        <Grid container spacing={2}>
          {dorms.map((dorm) => {
            return (
              <Grid key={dorm.id} size={3}>
                <Card sx={{ m: 1 }} raised={true}>
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
                      color="info"
                      sx={{ p: 1, m: 1, flex: 1 }}
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
                      color="primary"
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
              <CustomTextField
                value={address}
                label="Įveskite bendrabučio adresą"
                type="email"
                onChange={handleChange}
                name="address"
                isError={isInputError.editAddress}
                helperText={
                  isInputError.editAddress && inputErrorMessage.editAddress
                }
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <CloseButton label="Uždaryti" onClick={handleEdit} />
              <SuccessButton
                label="Redaguoti"
                onClick={() => {
                  editDorm(dormId, address);
                }}
              />
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
              onClick={() => {
                setInputAddress("");
                handleAdd();
              }}
            >
              Pridėti
            </Button>
          </Grid>
        </Grid>
        <Dialog fullWidth={true} open={addOpen} onClose={handleAdd}>
          <DialogTitle>Bendrabučio pridėjimas</DialogTitle>

          <DialogContent dividers={true}>
            <CustomTextField
              value={inputAddress}
              label="Įveskite bendrabučio adresą"
              type="email"
              onChange={handleAddChange}
              name="address"
              isError={isInputError.addAddress}
              helperText={
                isInputError.addAddress && inputErrorMessage.addAddress
              }
              variant="outlined"
            />
          </DialogContent>

          <DialogActions>
            <CloseButton label="Uždaryti" onClick={handleAdd} />
            <SuccessButton
              label="Pridėti"
              onClick={() => {
                addDorm(inputAddress);
              }}
            />
          </DialogActions>
        </Dialog>
        <Dialog open={confirmOpen} onClose={handleConfirm}>
          <DialogTitle id="alert-dialog-title">
            {"Ištrinti šį bendrabutį?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
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
      </DormsBox>
    </ProtectedRoute>
  );
};

const DormsBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default Dorms;
