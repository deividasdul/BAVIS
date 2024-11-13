import React, { useState } from "react";
import { Alert, Collapse, Typography, Divider } from "@mui/material";
import { useContext } from "react";
import { NotificationsContext } from "../context/NotificationsContext";

export const NotificationBar = () => {
  const { notifications } = useContext(NotificationsContext);

  const [isOpen, setIsOpen] = useState(true);

  return notifications.map((notification) => {
    return (
      <Collapse in={isOpen}>
        <Alert
          sx={{ borderRadius: 0, border: 1, overflow: "hidden" }}
          key={notification.id}
          severity="warning"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Typography sx={{ wordBreak: "break-word" }} variant="h6">
            {notification.message}
          </Typography>
        </Alert>
      </Collapse>
    );
  });
};
