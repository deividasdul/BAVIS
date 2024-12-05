import React, { useContext, useState } from "react";

import {
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import SuccessButton from "../components/ui/SuccessButton";
import CloseButton from "../components/ui/CloseButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NotificationsContext } from "../context/NotificationsContext";
import { ProtectedRouteAdmin } from "../components/ProtectedRouteAdmin";

const Notifications = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { notifications, changeStatus, addNotification } =
    useContext(NotificationsContext);

  const handleAdd = () => {
    setMessage("");
    setAddOpen(!addOpen);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setMessage(value);
  };

  return (
    <ProtectedRouteAdmin>
      <NotificationBox>
        <Divider>Rezervacijos</Divider>
        <Divider sx={{ m: 2 }}>Vartotojo pranešimai</Divider>
        <Divider sx={{ m: 2 }}>Sistemos pranešimai</Divider>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            direction={"column"}
          >
            {notifications.map((notification, index) => {
              return (
                <Accordion
                  sx={{ minWidth: "50%", maxWidth: "50%" }}
                  key={notification.id}
                  {...(index === 0 && { defaultExpanded: true })}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {index + 1}. Pranešimas
                  </AccordionSummary>
                  <AccordionDetails sx={{ wordBreak: "break-word" }}>
                    {notification.message}
                  </AccordionDetails>
                  <AccordionActions>
                    <CloseButton
                      onClick={() => {
                        changeStatus(notification.id);
                      }}
                      label={"Ištrinti"}
                    />
                  </AccordionActions>
                </Accordion>
              );
            })}
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: 2,
          }}
        >
          <SuccessButton label={"Naujas pranešimas"} onClick={handleAdd} />
        </Box>
        <Divider></Divider>
      </NotificationBox>

      <Dialog fullWidth={true} open={addOpen} onClose={handleAdd}>
        <DialogTitle>Naujas pranešimas</DialogTitle>
        <DialogContent dividers={true}>
          <TextField
            value={message}
            label="Įveskite pranešimą"
            type="text"
            onChange={handleChange}
            name="message"
            variant="outlined"
            multiline
            fullWidth
            maxRows={6}
            minRows={3}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <CloseButton label="Uždaryti" onClick={handleAdd} />
          <SuccessButton
            label="Paskelbti"
            onClick={() => {
              addNotification(message);
              handleAdd();
            }}
          />
        </DialogActions>
      </Dialog>
    </ProtectedRouteAdmin>
  );
};

const NotificationBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default Notifications;
