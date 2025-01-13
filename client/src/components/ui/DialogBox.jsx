import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import CloseButton from "./CloseButton";
import SuccessButton from "./SuccessButton";

const DialogBox = ({ title, open, onClose, children, onClick, label }) => {
  return (
    <Dialog fullWidth={true} open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers={true}>{children}</DialogContent>
      <DialogActions>
        <CloseButton label="Uždaryti" onClick={onClose} />
        <SuccessButton label={label} onClick={onClick} />
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
