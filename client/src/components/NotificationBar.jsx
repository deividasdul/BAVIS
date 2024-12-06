import React, { useState } from "react";
import { Alert, Collapse, Typography } from "@mui/material";
import { useContext } from "react";
import { NotificationsContext } from "../context/NotificationsContext";

export const NotificationBar = () => {
  const { notifications } = useContext(NotificationsContext);

  const [isOpen, setIsOpen] = useState(true);

  return notifications.map((notification) => {
    return (
      <Collapse key={notification.id} in={isOpen}>
        <Alert
          sx={{ borderRadius: 0, border: 1, overflow: "hidden" }}
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
