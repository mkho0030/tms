import React from "react";
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
import { InfoOutlined } from "@mui/icons-material";
import DropdownsAndButtons from "./DropdownsAndButtons";
import TaskRow from "./TaskRow";

const TaskTable = () => {
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
        <DropdownsAndButtons />
        <TableContainer sx={{ height: "100%" }}>
          <Table sx={{ width: "calc(100% - 48px)", mx: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
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
              {/* Table Rows Go Here */}
              <TaskRow />
              {/* <TableRow sx={{ height: "100%" }}>
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
							</TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TaskTable;
