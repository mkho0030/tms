import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import { AvatarGroup, ToggleButton, ToggleButtonGroup } from "@mui/material";

const avatars = [
  "/static/images/avatar/1.jpg",
  "/static/images/avatar/2.jpg",
  "/static/images/avatar/3.jpg",
];

function ResponsiveAppBar({ isTask }: { isTask: boolean }) {
  const [view, setView] = useState<string | null>("list");

  return (
    <Toolbar disableGutters sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        noWrap
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: 400,
          letterSpacing: ".022rem",
          color: "black",
          textDecoration: "none",
        }}
      >
        {isTask ? "My Tasks" : "FIT3161 Team"}
      </Typography>
      {/* This box should only appear if we are at teams project  */}
      {!isTask && (
        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
          <Button sx={{ mx: 1 }}>
            <OpenInNewIcon sx={{ mr: 1 }} />
            Copy Team Link
          </Button>
          <Button sx={{ mx: 1 }}>
            <PersonAddIcon sx={{ mr: 1 }} />
            Add New Member
          </Button>
          <AvatarGroup max={4} spacing={"small"}>
            <Avatar alt="Test" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Test" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Test" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Test" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Test" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </Box>
      )}

      <ToggleButtonGroup
        sx={{ ml: 1, color: "black" }}
        aria-label="Basic button group"
        value={view}
        exclusive
        onChange={(_, val) => setView(val)}
      >
        <ToggleButton value={"list"}>
          <FormatAlignLeftIcon sx={{ color: "#2a2a2a" }} />
        </ToggleButton>
        <ToggleButton value={"calander"}>
          <CalendarTodayIcon sx={{ color: "#2a2a2a" }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
  );
}

export default ResponsiveAppBar;
