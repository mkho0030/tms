import React, { useEffect, useState } from "react";
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

import { ProjectTypes } from "../../types/db-data";
export const drawerWidth = 245;

const AppDrawer: React.FC = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/projects`
      );
      const data = await res.json();
      return data;
    };

    fetchData()
      .then((res) => setProjects(res))
      .catch(console.error);
  }, [router]);

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
              selected={router.query.id == project._id}
              onClick={() => router.push(`/teams/${project._id}`)}
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
