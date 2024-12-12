import React, { useContext, useState } from "react";
import {
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid2";

import PersonIcon from "@mui/icons-material/Person";

import { validateField, validateName } from "../utils/formValidation";

import PersonOffIcon from "@mui/icons-material/PersonOff";
import { UsersContext } from "../context/UsersContext";
import { ProtectedRouteAdmin } from "../components/ProtectedRouteAdmin";
import CustomTextField from "../components/ui/CustomTextField";
import SuccessButton from "../components/ui/SuccessButton";
import CloseButton from "../components/ui/CloseButton";

function Users() {
  const { users, putUser, deactivateUser, activateUser } =
    useContext(UsersContext);

  const [userId, setUserId] = useState(0);
  const [isConfirmRequired, setConfirmedRequired] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
  });

  const [isInputError, setIsInputError] = useState({
    firstName: false,
    lastName: false,
  });

  const [inputErrorMessage, setInputErrorMessage] = useState({
    firstName: "",
    lastName: "",
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

  const editUser = ({ firstName, lastName }, userId) => {
    var isError = false;

    if (validateField(firstName)) {
      setError("firstName", "Vardo laukas negali būti tuščias");
      isError = true;
    } else if (!validateName(firstName)) {
      setError("firstName", "Vardo lauke turi būti tik raidės");
      isError = true;
    } else {
      clearError("firstName");
    }

    if (validateField(lastName)) {
      setError("lastName", "Pavardės laukas negali būti tuščias");
      isError = true;
    } else if (!validateName(lastName)) {
      setError("lastName", "Pavardės lauke turi būti tik raidės");
      isError = true;
    } else {
      clearError("lastName");
    }

    if (isError) return;

    const fixedFirstName =
      input.firstName.slice(0, 1).toUpperCase() +
      input.firstName.slice(1, input.firstName.length).toLowerCase();
    const fixedLastName =
      input.lastName.slice(0, 1).toUpperCase() +
      input.lastName.slice(1, input.lastName.length).toLowerCase();

    const fixedInput = {
      firstName: fixedFirstName,
      lastName: fixedLastName,
    };

    putUser(fixedInput, userId);

    handleEditClose();
  };

  const handleConfirm = () => {
    setConfirmedRequired(!isConfirmRequired);
  };

  const handleEditOpen = (user) => {
    setIsEditOpen(true);
    setInput({
      firstName: user.first_name,
      lastName: user.last_name,
    });
  };
  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "first_name",
      headerName: "Vardas",
      width: 150,
      editable: false,
    },
    {
      field: "last_name",
      headerName: "Pavardė",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "El. paštas",
      width: 300,
      editable: false,
    },
    {
      field: "role",
      headerName: "Rolė",
      width: 110,
      editable: false,
    },
    {
      field: "fullName",
      headerName: "Vardas ir pavardė",
      sortable: false,
      width: 200,
      valueGetter: (value, row) =>
        `${row.first_name || ""} ${row.last_name || ""}`,
    },
    {
      field: "status",
      headerName: "Statusas",
      width: 200,
      editable: false,

      renderCell: ({ row }) => {
        return (
          <Alert severity={row.status == "Active" ? "success" : "error"}>
            {row.status == "Active" ? "Aktyvus" : "Neaktyvus"}
          </Alert>
        );
      },
    },
    {
      field: "action",
      headerName: "Veiksmai",
      sortable: false,
      width: 200,
      disableClickEventBubling: true,

      renderCell: ({ row }) => {
        return (
          <>
            <ActionButton
              onClick={() => {
                clearError("firstName");
                clearError("lastName");
                handleEditOpen(row);
                setUserId(row.id);
              }}
              color="primary"
              icon={<EditIcon fontSize="large" />}
            />
            <ActionButton
              disabled={
                row.role == "Admin" || row.status == "Inactive" ? true : false
              }
              onClick={() => {
                setUserId(row.id);
                handleConfirm();
              }}
              color="error"
              icon={<PersonOffIcon fontSize="large" />}
            />
            <ActionButton
              disabled={row.status != "Inactive" ? true : false}
              onClick={() => {
                activateUser(row.id);
              }}
              color="success"
              icon={<PersonIcon fontSize="large" />}
            />
          </>
        );
      },
    },
  ];

  return (
    <ProtectedRouteAdmin>
      <UsersBox>
        <Paper elevation={12}>
          <DataGrid
            density="comfortable"
            autoHeight={true}
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Paper>
        <Dialog open={isConfirmRequired} onClose={handleConfirm}>
          <DialogTitle>{"Deaktyvuoti šį naudotoją?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Paspaudus, naudotojo paskyra sistemoje bus deaktyvuota
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm}>Atšaukti</Button>
            <Button
              variant="contained"
              color="error"
              disableElevation
              onClick={() => {
                deactivateUser(userId);
                handleConfirm();
              }}
              autoFocus
            >
              Patvirtinti
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog fullWidth={true} open={isEditOpen} onClose={handleEditClose}>
          <DialogTitle>Vartotojo redagavimas</DialogTitle>
          <DialogContent dividers={true}>
            <Grid container spacing={2}>
              <CustomTextField
                value={input.firstName}
                label="Įveskite vartotojo vardą"
                type="text"
                onChange={handleChange}
                name="firstName"
                isError={isInputError.firstName}
                helperText={
                  isInputError.firstName && inputErrorMessage.firstName
                }
                variant="outlined"
              />
              <CustomTextField
                value={input.lastName}
                label="Įveskite vartotojo pavardę"
                type="text"
                onChange={handleChange}
                name="lastName"
                isError={isInputError.lastName}
                helperText={isInputError.lastName && inputErrorMessage.lastName}
                variant="outlined"
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <CloseButton label="Uždaryti" onClick={handleEditClose} />
            <SuccessButton
              label="Redaguoti"
              onClick={() => {
                editUser(input, userId);
              }}
            />
          </DialogActions>
        </Dialog>
      </UsersBox>
    </ProtectedRouteAdmin>
  );
}

const ActionButton = ({ icon, color, onClick, disabled = false }) => {
  return (
    <IconButton disabled={disabled} onClick={onClick} color={color}>
      {icon}
    </IconButton>
  );
};

const UsersBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: 10,
}));

export default Users;
