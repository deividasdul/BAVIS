import React, { useEffect, useState } from "react";
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
  TextField,
  ButtonGroup,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

function Users() {
  const [users, setUsers] = useState([]);

  const [userId, setUserId] = useState(0);

  const [isConfirmRequired, setConfirmedRequired] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
  });

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
      editable: true,
    },
    {
      field: "last_name",
      headerName: "Pavardė",
      width: 150,
      editable: true,
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
      editable: true,
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
      field: "action",
      headerName: "Veiksmai",
      sortable: false,
      width: 150,
      disableClickEventBubling: true,

      renderCell: ({ row }) => {
        return (
          <>
            <ActionButton
              onClick={() => {
                handleEditOpen(row);
              }}
              color="primary"
              icon={<EditIcon fontSize="large" />}
            />{" "}
            <ActionButton
              onClick={() => {
                setUserId(row.id);
                handleConfirm();
              }}
              color="error"
              icon={<PersonRemoveIcon fontSize="large" />}
            />
          </>
        );
      },
    },
  ];

  const fetchUsers = async () => {
    const usersData = await axios.get("http://localhost:3000/api/v1/users");
    setUsers(usersData.data);
  };

  const deleteUser = async () => {
    console.log(userId);

    const result = await axios.delete(
      `http://localhost:3000/api/v1/users/${userId}`
    );
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Paper elevation={24}>
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
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
        />
      </Paper>
      <Dialog
        open={isConfirmRequired}
        onClose={handleConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ištrinti šį vartotoją?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Paspaudus, pasirinktas vartotojas bus ištrintas iš sistemos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Atšaukti</Button>
          <Button
            variant="contained"
            color="error"
            disableElevation
            onClick={() => {
              deleteUser();
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
          <CustomTextField
            value={input.firstName}
            onChange={handleChange}
            label="Įveskite vartotojo vardą"
            name="firstName"
          />
          <CustomTextField
            value={input.lastName}
            onChange={handleChange}
            label="Įveskite vartotojo pavardę"
            name="lastName"
          />
        </DialogContent>
        <DialogActions>
          <ButtonGroup variant="contained" size="large" sx={{ gap: 1 }}>
            <Button onClick={handleEditClose}>Uždaryti</Button>
            <Button
              onClick={() => {
                putDorm(currentId);
                handleEditClose();
              }}
              type="submit"
            >
              Redaguoti
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const ActionButton = ({ icon, color, onClick }) => {
  return (
    <IconButton onClick={onClick} color={color}>
      {icon}
    </IconButton>
  );
};

const CustomTextField = ({ value, onChange, label, name }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      fullWidth
      variant="filled"
      label={label}
      type="text"
      required
      name={name}
    ></TextField>
  );
};

export default Users;
