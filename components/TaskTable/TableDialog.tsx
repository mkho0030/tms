import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const TableDialog = ({
  isOpen,
  handleClose,
  isCreateTask,
}: {
  isOpen: boolean;
  handleClose: any;
  isCreateTask: boolean;
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      {isCreateTask ? (
        <CreateTask handleClose={handleClose} />
      ) : (
        <DeleteTask handleClose={handleClose} />
      )}
    </Dialog>
  );
};

const CreateTask = ({ handleClose }: { handleClose: any }) => {
  return (
    <>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          Create New Task
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField fullWidth placeholder="Team Name" />
      </DialogContent>

      <DialogActions>
        <Button variant="text">Create new team</Button>
      </DialogActions>
    </>
  );
};

const DeleteTask = ({ handleClose }: { handleClose: any }) => {
  return (
    <>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          Create New Task
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>Deleted Task cannot be reverted.</Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="error">
          Confirm Delete Task
        </Button>
      </DialogActions>
    </>
  );
};

export default TableDialog;
