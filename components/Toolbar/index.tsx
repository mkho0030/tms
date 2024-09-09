import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  AvatarGroup,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ProjectTypes } from "../../types/db-data";
import { useToast } from "../../logics/providers/ToastContext";
import { PersonAdd } from "@mui/icons-material";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function ResponsiveAppBar({
  isTask,
  project,
  isLoading,
}: {
  isTask: boolean;
  project?: ProjectTypes;
  isLoading?: boolean;
}) {
  const [view, setView] = useState<string | null>("list");
  const { setToast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_APP_URL}/${project?._id}`
    );
    setToast({
      message: "Team link copied!",
      type: "success",
    });
  };

  return (
    <Toolbar disableGutters sx={{ width: "100%" }}>
      {isLoading ? (
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton
            variant="text"
            sx={{ fontSize: "2.125rem", width: "250px" }}
          ></Skeleton>
        </Box>
      ) : (
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
          {isTask ? "My Tasks" : project?.name}
        </Typography>
      )}

      {/* This box should only appear if we are at teams project  */}
      {!isTask && (
        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
          <Button sx={{ mx: 1 }} onClick={handleCopyLink} disabled={isLoading}>
            <OpenInNewIcon sx={{ mr: 1 }} />
            Copy Team Link
          </Button>
          <Button sx={{ mx: 1 }} disabled={isLoading}>
            <PersonAdd sx={{ mr: 1 }} />
            Add New Member
          </Button>
          <AvatarGroup max={4} spacing={"small"}>
            {isLoading
              ? ["", "", "", ""].map(() => (
                  <Skeleton
                    variant="circular"
                    sx={{ width: 32, height: 32, marginLeft: '-8px' }}
                  ><Avatar/></Skeleton>
                ))
              : project?.members.map((member) => (
                  <Avatar
                    alt={member.name}
                    src={member.photoUrl}
                    sx={{ width: 32, height: 32 }}
                  />
                ))}
          </AvatarGroup>
        </Box>
      )}
      {/* <ToggleButtonGroup
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
      </ToggleButtonGroup> */}
    </Toolbar>
  );
}

export default ResponsiveAppBar;
