import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CustomTextField from "./CustomTextField";
import CloseButton from "./CloseButton";
import SuccessButton from "./SuccessButton";

export default function EditAddDialog({ open, onClose, title }) {
  return (
    <Dialog fullWidth={true} open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent dividers={true}>
        <CustomTextField
          value={inputAddress}
          label="Įveskite bendrabučio adresą"
          type="email"
          onChange={handleAddChange}
          name="address"
          isError={isInputError.addAddress}
          helperText={isInputError.addAddress && inputErrorMessage.addAddress}
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
  );
}
