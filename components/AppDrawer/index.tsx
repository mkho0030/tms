import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
} from "@mui/material";

import { Add } from "@mui/icons-material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import Logo from "../Logo";
import { useRouter } from "next/router";

export const drawerWidth = 245;

const AppDrawer: React.FC = () => {
  const router = useRouter();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      elevation={4}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      {/* To set logo once created */}

      <Toolbar
        variant="dense"
        disableGutters
        sx={{ paddingLeft: 1, paddingRight: 1 }}
      >
        <Logo />
      </Toolbar>
      {/* My Task */}
      <List>
        <ListItemButton
          selected={router.pathname.startsWith("/tasks")}
          onClick={() => router.push("/tasks")}
        >
          <ListItemIcon>
            <ContentPasteIcon />
          </ListItemIcon>
          <ListItemText>My Task</ListItemText>
        </ListItemButton>
      </List>
      {/* Project List */}
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            My Projects
          </ListSubheader>
        }
      >
        {/* Get Project List from API */}
      </List>
      <Divider />
      {/*  Action Button List */}
      <List>
        <ListItemButton>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>Create new Team</ListItemText>
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <OpenInNewIcon />
          </ListItemIcon>
          <ListItemText>Join Existing Team</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default AppDrawer;
