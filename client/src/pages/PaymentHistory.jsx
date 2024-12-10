import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { styled } from "@mui/system";
import { Box, Paper, IconButton, Stack, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PaymentIcon from "@mui/icons-material/Payment";

const PaymentHistory = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "first_name",
      headerName: "Vardas",
      width: 100,
    },
    {
      field: "last_name",
      headerName: "Pavardė",
      width: 100,
    },
    {
      field: "address",
      headerName: "Bendrabutis",
      width: 200,
    },
    {
      field: "number",
      headerName: "Kambarys",
      width: 100,
    },
    {
      field: "actual_arrival_date",
      headerName: "Atvykimo data",
      width: 150,
    },
    {
      field: "actual_departure_date",
      headerName: "Išvykimo data",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Kiekis",
      width: 150,
    },
    {
      field: "payment_date",
      headerName: "Mokėjimo data",
      width: 150,
    },
    {
      field: "paid",
      headerName: "Sumokėta",
      width: 200,
      renderCell: ({ row }) => (
        <Alert severity={row.paid ? "success" : "error"}>
          {row.paid ? "Sumokėta" : "Nesumokėta"}
        </Alert>
      ),
    },
    {
      field: "action",
      headerName: "Mokėti",
      width: 100,
      renderCell: ({ row }) => (
        <ActionButton
          onClick={() => {}}
          color="primary"
          icon={<PaymentIcon fontSize="large" />}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Eksportuoti",
      width: 150,
      renderCell: ({ row }) => (
        <>
          <ActionButton
            onClick={() => {}}
            color="error"
            icon={<PictureAsPdfIcon fontSize="large" />}
          />
          <ActionButton
            icon={
              <svg
                width="36"
                height="36"
                color="green"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm1.8 18H14l-2-3.4l-2 3.4H8.2l2.9-4.5L8.2 11H10l2 3.4l2-3.4h1.8l-2.9 4.5zM13 9V3.5L18.5 9z"
                />
              </svg>
            }
          />
        </>
      ),
    },
  ];

  const [stayData, setStayData] = useState([]);
  const { user } = useAuth();

  const fetchStay = async (id) => {
    try {
      if (id) {
        const result = await axios.get(
          `http://localhost:3000/api/v1/reservation/${id}`
        );
        setStayData(result.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchStay(user.id);
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <StayDataBox>
        <Paper elevation={24}>
          <DataGrid
            density="comfortable"
            autoHeight={true}
            rows={stayData}
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
      </StayDataBox>
    </ProtectedRoute>
  );
};

const StayDataBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const ActionButton = ({ icon, color, onClick }) => {
  return (
    <IconButton onClick={onClick} color={color}>
      {icon}
    </IconButton>
  );
};

export default PaymentHistory;
