import React from "react";
import useIsOpen from "../../logics/hooks/useIsOpen";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";

const CreateTeamDialog: React.FC<{
}> = () => {
  const { isOpen, handleOpen, handleClose } = useIsOpen();

  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText>Create new Team</ListItemText>
      </ListItemButton>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            Create New Team
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
      </Dialog>
    </>
  );
};

export default CreateTeamDialog;
