import {
  Avatar,
  AvatarGroup,
  Checkbox,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import ProgressStatus from "../ProgressStatus";

const TaskRow = ({
  tasks,
  handleChecked,
  isSelected,
}: {
  tasks: any;
  handleChecked: any;
  isSelected: any;
}) => {
  const router = useRouter();

  return (
    <TableRow
      id={tasks._id}
      hover
      onClick={() =>
        router.push(`${process.env.NEXT_PUBLIC_APP_URL}/teams/${tasks.projectId}/${tasks._id}`)
      }
      selected={isSelected(tasks._id)}
      role="checkbox"
      aria-checked={isSelected(tasks._id)}
      sx={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          onClick={(e) => handleChecked(e, tasks._id)}
          checked={isSelected(tasks._id)}
        />
      </TableCell>
      <TableCell>
        <Typography>{tasks?.name}</Typography>
      </TableCell>
      <TableCell>
        <AvatarGroup
          max={4}
          spacing={"small"}
          sx={{ justifyContent: "flex-end" }}
        >
          {tasks?.assignees?.map((user: any) => (
            <Avatar
              sx={{ width: "32px", height: "32px" }}
              alt={user.name}
              src={user.photoUrl}
            />
          ))}
        </AvatarGroup>
      </TableCell>
      <TableCell>
        <Typography>{dayjs(tasks.endDate).format("DD MMM YY")}</Typography>
      </TableCell>
      <TableCell>
        <ProgressStatus status={tasks.status} />
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
