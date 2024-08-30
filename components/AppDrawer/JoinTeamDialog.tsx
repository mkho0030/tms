import { Close, OpenInNew } from "@mui/icons-material";
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
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joinTeamSchema } from "../Form/teamSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextFieldElement } from "react-hook-form-mui";
import { useRouter } from "next/router";
import { useToast } from "../../logics/providers/ToastContext";
import useIsOpen from "../../logics/hooks/useIsOpen";

const JoinTeamDialog: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { isOpen, handleOpen, handleClose } = useIsOpen();

  const router = useRouter();
  const { setToast } = useToast();

  const { control, handleSubmit } = useForm<z.infer<typeof joinTeamSchema>>({
    resolver: zodResolver(joinTeamSchema),
  });

  const handleOnSubmit = async (values: z.infer<typeof joinTeamSchema>) => {
    // Todo: On Error, add error message to form
    try {
      setLoading(true);

      const { link } = values;
      const teamId = link.split("/")[3];
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/test/team/join/${teamId}`,
        {
          method: "POST",
          body: JSON.stringify({ user: "" }),
        }
      );

      const { id } = await req.json();

      if (!id) throw Error("Team is not found");

      setToast({
        message: "Team successfuly joined",
        type: "success",
      });
      setLoading(false);
      handleClose();

      router.push(`/teams/${id}`);
    } catch (error) {
      setToast({
        message: (error as Error).message,
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
          <OpenInNew />
        </ListItemIcon>
        <ListItemText>Join Existing Team</ListItemText>
      </ListItemButton>

      <Dialog
        open={isOpen}
        maxWidth="sm"
        fullWidth
        id="join-form"
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(handleOnSubmit),
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            Join existing team
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextFieldElement
            fullWidth
            name="link"
            control={control}
            required
            disabled={loading}
            placeholder="Enter team invite link"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="text" type="submit" disabled={loading}>
            Join team
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JoinTeamDialog;
