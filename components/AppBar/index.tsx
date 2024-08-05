import React, { useEffect, useState } from "react";
import { IconButton, Avatar, Toolbar, Popover, MenuItem, MenuList, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";
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

  const { signOutUser } = useAuth();

  // Sample user data
  const user = {
    username: 'JohnDoe',
    email: 'john.doe@example.com'
  };

  const handleLogout = () => {
    handleClose();
    signOutUser();
  }

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
          <Avatar sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Toolbar>

      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuList>
          <ListItem>
			<Avatar sx={{ width: 40, height: 40, marginRight: 2}} />
            <ListItemText
              primary={user.username}
              secondary={user.email}
            />
          </ListItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Account Settings" />
          </MenuItem>
		  <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};

export default CustomAppBar;