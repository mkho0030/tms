import React, { useState } from "react";
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
import DropdownsAndButtons from "./DropdownsAndButtons";
import TaskRow from "./TaskRow";

import rows from "../../mock/tasks.json";
import { InfoOutlined } from "@mui/icons-material";

const TaskTable = () => {
  const [selected, setSelected] = useState<readonly number[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

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
        sx={{ height: "100%", mb: 2, display: "flex", flexDirection: "column" }}
      >
        <DropdownsAndButtons isSelected={selected.length > 0} />
        <TableContainer sx={{ height: "100%" }}>
          <Table sx={{ width: "calc(100% - 48px)", mx: 3 }}>
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
              {rows && rows.length != 0 ? (
                rows.map((row, index) => (
                  <TaskRow
                    key={index}
                    tasks={row}
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

export default TaskTable;
