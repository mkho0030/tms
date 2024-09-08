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

import ContentPasteIcon from "@mui/icons-material/ContentPaste";

import Logo from "../Logo";
import { useRouter } from "next/router";
import CreateTeamDialog from "./CreateTeamDialog";
import JoinTeamDialog from "./JoinTeamDialog";

import team from "../../mock/team.json";
export const drawerWidth = 245;

const AppDrawer: React.FC = () => {
  const router = useRouter();
  const projects: ProjectTypes[] = [team];
  console.log(router.pathname);
  console.log(projects[0].uid);

  return (
    <>
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
          {projects.map((project, index) => (
            <ListItemButton
              selected={router.query.id == project.uid}
              onClick={() => router.push(`/teams/${project.uid}`)}
            >
              <ListItemIcon>
                <ContentPasteIcon />
              </ListItemIcon>
              <ListItemText>{project.name}</ListItemText>
            </ListItemButton>
          ))}
        </List>
        <Divider />
        {/*  Action Button List */}
        <List>
          <CreateTeamDialog />
          <JoinTeamDialog />
        </List>
      </Drawer>
    </>
  );
};

export default AppDrawer;
