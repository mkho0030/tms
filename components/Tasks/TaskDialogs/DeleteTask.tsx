import { Close } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import React from "react";

const DeleteTask: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => {};
}> = ({
  isOpen,
  handleClose,
  handleSubmit,
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          Delete Task
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>Deleted Task cannot be reverted.</Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="error" onClick={handleSubmit}>
          Confirm Delete Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTask;
