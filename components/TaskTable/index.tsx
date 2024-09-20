import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Paper,
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
import {
  TaskTableProvider,
  useTaskTable,
} from "../../logics/providers/TaskTableContext";
import TableToolbar from "./TableToolbar";

const TaskTable = ({ project }: { project?: ProjectTypes }) => {
  const { 
    taskList, 
    isLoading, 
    selected, 
    handleClick, 
    handleSelectAllClick } =
  useTaskTable();
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
              {!isLoading && taskList && taskList.length != 0 ? (
                taskList.map((task, index) => (
                  <TaskRow
                    key={index}
                    tasks={task}
                    handleChecked={handleClick}
                    isSelected={isSelected}
                  />
                ))
              ) : (
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
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

const ContextWrappedTaskTable = ({ project }: { project?: ProjectTypes }) => {
  return (
    <TaskTableProvider>
      <TaskTable project={project} />
    </TaskTableProvider>
  );
};

export default ContextWrappedTaskTable;
