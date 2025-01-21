import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { styled } from "@mui/system";
import { Box, Paper, IconButton, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PaymentIcon from "@mui/icons-material/Payment";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ExcelJS from "exceljs";

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
          onClick={async () => {
            try {
              window.location.reload();
              await axios.post(
                `http://localhost:3000/api/v1/payment/pay/${row.id}`
              );
            } catch (e) {
              console.log(e);
            }
          }}
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
            onClick={() => {
              exportToPdf(row);
            }}
            color="error"
            icon={<PictureAsPdfIcon fontSize="large" />}
          />
          <ActionButton
            icon={
              <svg
                onClick={() => exportToExcel([row])}
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

  const exportToExcel = async (
    data,
    fileName = `bavis_${data[0].payment_date}.xlsx`
  ) => {
    const workbook = new ExcelJS.Workbook();

    let date = data[0].payment_date;

    const worksheet = workbook.addWorksheet(`Mokėjimas ${date}`);

    worksheet.columns = [
      { header: "ID", key: "id", width: 5 },
      { header: "Vardas", key: "first_name", width: 15 },
      { header: "Pavardė", key: "last_name", width: 15 },
      { header: "Bendrabutis", key: "address", width: 30 },
      { header: "Kambarys", key: "number", width: 10 },
      { header: "Atvykimo data", key: "actual_arrival_date", width: 15 },
      { header: "išvykimo data", key: "actual_departure_date", width: 15 },
      { header: "Statusas", key: "paid", width: 10 },
      { header: "Kiekis", key: "amount", width: 10 },
      { header: "Mokėjimo data", key: "payment_date", width: 15 },
    ];

    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1976D2" },
    };

    data.forEach((row) => worksheet.addRow(row));

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const exportToPdf = (rowData) => {
    const doc = new jsPDF();

    const pdfContent = `
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
      <div
        style="background-color: rgb(25, 118, 210); width: 100%; height: 20rem; display: flex; align-items: center; justify-content: center; color: white;">
        <h1 style="font-size: 14rem; margin: 0; padding: 0;">BAVIS</h1>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-top: 2rem; font-size: 2rem;">
        <thead>
          <tr>
            <th style="background-color: rgb(25, 118, 210); color: white; padding: 16px; text-align: left; border: 1px solid #ddd;">Laukas</th>
            <th style="background-color: rgb(25, 118, 210); color: white; padding: 16px; text-align: left; border: 1px solid #ddd;">Reikšmė</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 16px; border: 1px solid #ddd;">Vardas ir pavardė</td>
            <td style="padding: 16px; border: 1px solid #ddd;">${rowData.first_name} ${rowData.last_name}</td>
          </tr>
          <tr>
            <td style="padding: 16px; border: 1px solid #ddd;">Adresas</td>
            <td style="padding: 16px; border: 1px solid #ddd;">${rowData.address}, kambarys ${rowData.number}</td>
          </tr>
          <tr>
            <td style="padding: 16px; border: 1px solid #ddd;">Atvykimo data</td>
            <td style="padding: 16px; border: 1px solid #ddd;">${rowData.actual_arrival_date}</td>
          </tr>
          <tr>
            <td style="padding: 16px; border: 1px solid #ddd;">Išvykimo data</td>
            <td style="padding: 16px; border: 1px solid #ddd;">${rowData.actual_departure_date}</td>
          </tr>
          <tr>
            <td style="padding: 16px; border: 1px solid #ddd;">Suma</td>
            <td style="padding: 16px; border: 1px solid #ddd;">€${rowData.amount}</td>
          </tr>
          <tr>
            <td style="padding: 16px; border: 1px solid #ddd;">Mokėjimo data</td>
            <td style="padding: 16px; border: 1px solid #ddd;">${rowData.payment_date || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 16px; border: 1px solid #ddd;">Statusas</td>
            <td style="padding: 16px; border: 1px solid #ddd;">${rowData.paid ? "Sumokėta" : "Nesumokėta"}</td>
          </tr>
        </tbody>
      </table>
    </body>
  `;

    const pdfWrapper = document.createElement("div");
    pdfWrapper.innerHTML = pdfContent;
    document.body.appendChild(pdfWrapper);

    html2canvas(pdfWrapper).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 10, 190, 0);
      doc.save(`bavis_${rowData.payment_date}.pdf`);
      document.body.removeChild(pdfWrapper);
    });
  };

  const [stayData, setStayData] = useState([]);
  const { user } = useAuth();

  const fetchStay = async (id) => {
    try {
      if (id) {
        const result = await axios.get(
          `http://localhost:3000/api/v1/reservation/${id}`
        );
        const dataWithIds = result.data.map((row, index) => ({
          ...row,
          id: row.id || `${index + 1}`,
        }));
        setStayData(dataWithIds);
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
