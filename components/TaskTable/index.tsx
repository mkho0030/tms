import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Checkbox,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TaskRow from "./TaskRow";

import rows from "../../mock/tasks.json";
import { InfoOutlined } from "@mui/icons-material";
import { ProjectTypes } from "../../types/db-data";
import { useTaskList } from "../../logics/providers/TaskListContext";
import TableToolbar from "./TableToolbar";

const TaskTable = ({ project }: { project?: ProjectTypes }) => {
  const {
    filteredList,
    isLoading,
    selected,
    handleClick,
    handleSelectAllClick,
  } = useTaskList();
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Box
      sx={{
        width: "auto",
        position: "absolute",
        top: 114,
        bottom: 24,
        right: 24,
        left: 268,
      }}
    >
      <Paper
        sx={{
          height: "100%",
          mb: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TableToolbar project={project} isSelected={selected.length > 0} />
        <TableContainer>
          <Table sx={{ width: "calc(100% - 48px)", height: "100%", mx: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={selected.length > 0}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Task</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Assigned To</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Due Date</Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <Typography variant="subtitle1">Progress Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                filteredList && filteredList.length != 0 ? (
                  filteredList.map((task, index) => (
                    <TaskRow
                      key={index}
                      tasks={task}
                      handleChecked={handleClick}
                      isSelected={isSelected}
                    />
                  ))
                ) : (
                  // No task found
                  <TableRow sx={{ height: "100%" }}>
                    <TableCell colSpan={5}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          alignContent: "center",
                          py: 20,
                        }}
                      >
                        <InfoOutlined sx={{ height: 64, width: 64 }} />
                        <Typography variant="h4" textAlign={"center"}>
                          No Task found
                        </Typography>
                        <Typography variant="body1" textAlign={"center"}>
                          Please add new task to start!
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              ) : (
                // Loading
                ["", "", "", ""].map(() => (
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" disabled />
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <Skeleton />
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <AvatarGroup
                        max={4}
                        spacing={"small"}
                        sx={{ justifyContent: "flex-end" }}
                      >
                        {["", "", "", ""].map(() => (
                          <Skeleton
                            variant="circular"
                            sx={{ width: 32, height: 32, marginLeft: "-8px" }}
                          >
                            <Avatar />
                          </Skeleton>
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <Skeleton />
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" width={120} height={24} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TaskTable;
