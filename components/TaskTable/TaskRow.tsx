import {
  Avatar,
  AvatarGroup,
  Checkbox,
  Chip,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const TaskRow = ({
  tasks,
  handleChecked,
  isSelected,
}: {
  tasks: any;
  handleChecked: any;
  isSelected: any;
}) => {
  const handleOnClick = () => {};

  return (
    <TableRow
      id={tasks.id}
      hover
      onClick={handleOnClick}
      selected={isSelected(tasks.id)}
      role="checkbox"
      aria-checked={isSelected(tasks.id)}
      sx={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          onClick={(e) => handleChecked(e, tasks.id)}
          checked={isSelected(tasks.id)}
        />
      </TableCell>
      <TableCell>
        <Typography>{tasks.name}</Typography>
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
        <Typography>{tasks.endDate}</Typography>
      </TableCell>
      <TableCell>
        <Chip label="In progress" color="warning" />
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
