import React, { useState } from "react";
import useIsOpen from "../../logics/hooks/useIsOpen";
import {
  Autocomplete,
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
import { useForm } from "react-hook-form";
import { createTeamSchema } from "../Form/teamSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextFieldElement } from "react-hook-form-mui";
import { useToast } from "../../logics/providers/ToastContext";
import { useRouter } from "next/router";

const CreateTeamDialog: React.FC<{}> = () => {
  const { isOpen, handleOpen, handleClose } = useIsOpen();
  const { setToast } = useToast();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
  });

  const handleOnClose = () =>{
    reset();
    handleClose();
  }

  const onSubmit = async (values: z.infer<typeof createTeamSchema>) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/projects`,
        {
          method: "POST",
          body: JSON.stringify({ name: values.name }),
        }
      );

      if (res.status == 201) {
        setToast({
          message: "Team Created!",
          type: "success",
        });

        const data = await res.json();
        
        reset();
        setIsLoading(false);
        handleClose();
        router.push(`${process.env.NEXT_PUBLIC_APP_URL}/teams/${data._id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText>Create new Team</ListItemText>
      </ListItemButton>
      <Dialog open={isOpen} onClose={handleOnClose} maxWidth="sm" fullWidth>
        <Box
          id={"create-team-form"}
          component={"form"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              Create New Team
              <IconButton onClick={handleOnClose}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <TextFieldElement
              fullWidth
              name="name"
              control={control}
              required
              disabled={isLoading}
              margin="normal"
              id="team-name"
              label="Team Name"
              placeholder="Team Name"
            />
          </DialogContent>
        </Box>
        <DialogActions>
          <Button
            type="submit"
            form="create-team-form"
            variant="text"
            disabled={isLoading}
          >
            Create new team
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTeamDialog;
