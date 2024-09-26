import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  Toolbar,
  Popover,
  MenuItem,
  MenuList,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { Logout, CalendarMonth } from "@mui/icons-material";
import { useAuth } from "../../logics/providers/AuthContext";
import { useToast } from "../../logics/providers/ToastContext";

const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setToast } = useToast();

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { signOutUser, user } = useAuth();

  const handleLogout = () => {
    handleClose();
    signOutUser();
  };

  const handleIcal = async () => {
    const result = await fetch("/api/ical/generate");
    if (result.ok) {
      const { data } = await result.json();
      navigator.clipboard.writeText(data);
      setToast({
        message: "Link copied to clipboard",
        type: "success",
      });
    }
  };

  return (
    <>
      <Toolbar
        variant="dense"
        sx={{
          background: "transparent",
          alignItems: "flex-end",
          justifyContent: "end",
        }}
      >
        {/* Account */}
        <IconButton onClick={handleOnClick}>
          <Avatar sx={{ width: 32, height: 32 }} src={user?.photoURL || ""} />
        </IconButton>
      </Toolbar>

      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2, pb: 0, width: 300 }}>
          <Typography
            variant="subtitle1"
            fontWeight={"400"}
            align="left"
            sx={{ mb: 0 }}
          >
            Account
          </Typography>
        </Box>
        <ListItem>
          <Avatar
            sx={{ width: 40, height: 40, marginRight: 2 }}
            src={user?.photoURL || ""}
          />
          <ListItemText primary={user?.displayName} secondary={user?.email} />
        </ListItem>
        <MenuList>
          <Divider />
          <MenuItem onClick={handleIcal}>
            <ListItemText primary="Copy iCal link" />
            <ListItemIcon>
              <CalendarMonth />
            </ListItemIcon>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemText primary="Logout" />
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};

export default CustomAppBar;
