import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskHeader: React.FC = () => {
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='h5' gutterBottom>
                Complete Task A
            </Typography>
            <Box display="flex" gap="20px">
                <Button variant="text" color="primary">
                    <CalendarTodayIcon sx={{ marginRight: '8px' }} />
                    Add to calendar
                </Button>
                <Button variant="text" sx={{ color: 'red' }}>
                    <DeleteIcon sx={{ marginRight: '8px' }} />
                    Delete task
                </Button>
            </Box>
        </Box>
    );
};

export default TaskHeader;