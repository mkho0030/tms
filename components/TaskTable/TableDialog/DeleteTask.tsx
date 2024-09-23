import { Close } from "@mui/icons-material";
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useTaskList } from "../../../logics/providers/TaskListContext";

export const DeleteTask = ({ handleClose }: { handleClose: any }) => {
  const {selected, deleteTasks} = useTaskList();

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

