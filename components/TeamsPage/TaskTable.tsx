import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const TaskTable = () => {
  return (
    <Box sx={{ mt: 4, width: '100%' }}>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                  Task
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                  Assigned To
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                  Due Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                  Progress Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Table Rows Go Here */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaskTable;