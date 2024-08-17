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
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const CreateTeamDialog: React.FC<{
	isOpen: boolean;
	handleOnOpen?: () => void;
	handleOnClose: () => void;
}> = ({ isOpen, handleOnOpen, handleOnClose }) => {
	return (
		<Dialog open={isOpen} onClose={handleOnClose} maxWidth='sm' fullWidth>
			<DialogTitle>
				<Box sx={{display: 'flex', justifyContent:'space-between'}}>
					Create New Team
					<IconButton onClick={handleOnClose}>
						<Close />
					</IconButton>
				</Box>
			</DialogTitle>
      <DialogContent>
        <TextField 
          fullWidth 
          placeholder="Team Name"
        />
      </DialogContent>

			<DialogActions>
        <Button variant="text">Create new team</Button>
      </DialogActions>
		</Dialog>
	);
};

export default CreateTeamDialog;
