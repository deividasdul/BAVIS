import React, { useContext, useState } from "react";

import {
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Stack,
  Typography,
  Badge,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import SuccessButton from "../components/ui/SuccessButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NotificationsContext } from "../context/NotificationsContext";
import { ProtectedRouteAdmin } from "../components/ProtectedRouteAdmin";
import MailIcon from "@mui/icons-material/Mail";
import WarningIcon from "@mui/icons-material/Warning";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { validateField } from "../utils/formValidation";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import DialogBox from "../components/ui/DialogBox";

const Notifications = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");

  const handleEdit = () => {
    setEditOpen(!editOpen);
  };

  const { notifications, patchNotification, changeStatus, addNotification } =
    useContext(NotificationsContext);

  const handleAdd = () => {
    setMessage("");
    setIsAddError(false);
    setAddErrorMessage("");
    setAddOpen(!addOpen);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setMessage(value);
    setMessageLength(value.length);
  };

  const [isAddError, setIsAddError] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  const [isEditError, setIssEditError] = useState(false);
  const [editErrorMessage, setEditErrorMessage] = useState("");

  const validateInput = () => {
    var isError = false;

    if (validateField(message)) {
      setIsAddError(true);
      setAddErrorMessage("Pranešimo laukas negali būti tuščias");
      isError = true;
    }

    if (messageLength > 255) {
      isError = true;
    }

    if (isError) return;

    addNotification(message);
    handleAdd();
  };

  const validateEdit = () => {
    var isError = false;

    if (validateField(message)) {
      setIsEditError(true);
      setEditErrorMessage("Pranešimo laukas negali būti tuščias");
      isError = true;
    }

    if (messageLength > 255) {
      isError = true;
    }

    if (isError) return;

    patchNotification(message, id);
    handleEdit();
  };

  return (
    <ProtectedRouteAdmin>
      <NotificationBox>
        <Accordion sx={{ p: 2, minWidth: "100%", maxWidth: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Badge
              sx={{ mr: 2 }}
              badgeContent={notifications.length}
              color="warning"
            >
              <MeetingRoomIcon fontSize="large" />
            </Badge>
            <Typography variant="h4">Rezervacijos</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ wordBreak: "break-word" }}>
            Turinys
          </AccordionDetails>
          <AccordionActions></AccordionActions>
        </Accordion>
        <Divider />
        <Accordion sx={{ p: 2, minWidth: "100%", maxWidth: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Badge
              sx={{ mr: 2 }}
              badgeContent={notifications.length}
              color="success"
            >
              <MailIcon fontSize="large" />
            </Badge>
            <Typography variant="h4">Vartotojo pranešimai</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ wordBreak: "break-word" }}>
            Turinys
          </AccordionDetails>
          <AccordionActions></AccordionActions>
        </Accordion>
        <Divider />

        {/* System notifications */}
        <Accordion sx={{ p: 2, width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Badge
              sx={{ mr: 2 }}
              badgeContent={notifications.length}
              color="error"
            >
              <WarningIcon fontSize="large" />
            </Badge>
            <Typography variant="h4">Sistemos pranešimai</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ wordBreak: "break-word" }}>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              direction={"column"}
              gap={2}
            >
              {notifications.map((notification, index) => {
                return (
                  <Accordion
                    sx={{ minWidth: "50%", maxWidth: "50%" }}
                    key={notification.id}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {index + 1}. Pranešimas
                    </AccordionSummary>
                    <AccordionDetails sx={{ wordBreak: "break-word" }}>
                      {notification.message}
                    </AccordionDetails>
                    <AccordionActions>
                      <IconButton
                        onClick={() => {
                          setMessage(notification.message);
                          setId(notification.id);
                          setMessageLength(notification.message.length);
                          handleEdit();
                        }}
                        color="primary"
                      >
                        <EditNotificationsIcon fontSize="large" />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          changeStatus(notification.id);
                        }}
                        color="error"
                      >
                        <NotificationsOffIcon fontSize="large" />
                      </IconButton>
                    </AccordionActions>
                  </Accordion>
                );
              })}
            </Stack>
          </AccordionDetails>
          <AccordionActions>
            <SuccessButton
              label={"Naujas pranešimas"}
              onClick={() => {
                handleAdd();
                setMessageLength(0);
              }}
            />
          </AccordionActions>
        </Accordion>
        <Divider />
      </NotificationBox>

      {/* New notification */}
      <DialogBox
        title={"Naujas pranešimas"}
        open={addOpen}
        onClose={handleAdd}
        onClick={() => {
          validateInput(addNotification, handleAdd);
        }}
      >
        <TextField
          value={message}
          fullWidth
          label={"Įveskite pranešimą"}
          type={"text"}
          onChange={handleChange}
          name={"message"}
          variant="outlined"
          error={isAddError}
          helperText={isAddError && addErrorMessage}
          multiline
          maxRows={3}
          minRows={2}
        ></TextField>
        <Typography
          sx={{
            color: messageLength > 255 && "red",
          }}
          align="right"
          variant="subtitle2"
        >
          {messageLength} / 255
        </Typography>
      </DialogBox>

      {/* Edit notification */}
      <DialogBox
        title={"Pranešimo redagavimas"}
        open={editOpen}
        onClose={handleEdit}
        onClick={validateEdit}
      >
        <TextField
          value={message}
          fullWidth
          label={"Įveskite pranešimą"}
          type={"text"}
          onChange={handleChange}
          name={"message"}
          variant="outlined"
          error={isEditError}
          helperText={isEditError && editErrorMessage}
          multiline
          maxRows={3}
          minRows={2}
        ></TextField>
        <Typography
          sx={{
            color: messageLength > 255 && "red",
          }}
          align="right"
          variant="subtitle2"
        >
          {messageLength} / 255
        </Typography>
      </DialogBox>
    </ProtectedRouteAdmin>
  );
};

const NotificationBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default Notifications;
