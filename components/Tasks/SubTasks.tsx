import React from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Subtasks: React.FC = () => {
    return (
        <Box flex={1}>
            <Typography variant="subtitle1" color='grey.600' gutterBottom>
                Subtasks:
            </Typography>
            <Box display="flex" gap="20px" mt={2}>
                <Button variant="outlined" endIcon={<AddIcon />} fullWidth>
                    Create new Subtask
                </Button>
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />} fullWidth>
                    Link existing task
                </Button>
            </Box>
        </Box>
    );
};

export default Subtasks;