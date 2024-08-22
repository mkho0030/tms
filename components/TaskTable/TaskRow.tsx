import {
  ArrowForward,
  ChevronRight,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Checkbox,
  Chip,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const TaskRow = () => {
  const [open, setOpen] = useState(false);

  const handleOnOpen = () => {
    setOpen(!open);
  };

  const handleOnClick = () => {};

  return (
    <>
      <TableRow hover onClick={handleOnClick}>
        <TableCell padding="checkbox">
          <Checkbox color="primary" />
        </TableCell>
        <TableCell>
          <Typography>Complete Task A</Typography>
        </TableCell>
        <TableCell>
          <AvatarGroup
            max={4}
            spacing={"small"}
            sx={{ justifyContent: "flex-end" }}
          >
            <Avatar alt="Test" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Test" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Test" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Test" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Test" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </TableCell>
        <TableCell>
          <Typography>3/05/2024 - Due in 5 days</Typography>
        </TableCell>
        <TableCell>
          <Chip label="In progress" color="warning" />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TaskRow;
