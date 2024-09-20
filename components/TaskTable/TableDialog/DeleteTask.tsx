import { Close } from "@mui/icons-material";
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useTaskTable } from "../../../logics/providers/TaskTableContext";

export const DeleteTask = ({ handleClose }: { handleClose: any }) => {
  const {selected, deleteTasks} = useTaskTable();

  const handleOnDelete = async () => {
    await deleteTasks(selected);
    handleClose();
  }

  return (
    <>
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
        <Button variant="text" color="error" onClick={handleOnDelete}>
          Confirm Delete Task
        </Button>
      </DialogActions>
    </>
  );
};

