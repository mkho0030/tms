import React, { useEffect, useState } from "react";
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
import { Notifications, Settings, Logout } from "@mui/icons-material";
import { useAuth } from "../../logics/providers/AuthContext";

const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
        {/* Notification bell */}
        <IconButton>
          <Notifications />
        </IconButton>
        {/* Account */}
        <IconButton onClick={handleOnClick}>
          <Avatar sx={{ width: 24, height: 24 }} src={user?.photoURL || ""} />
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
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="subtitle1" align="left" sx={{ mb: 0 }}>
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
          <MenuItem onClick={handleClose}>
            <ListItemText primary="Manage Account" />
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
          </MenuItem>
          <Divider />
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
