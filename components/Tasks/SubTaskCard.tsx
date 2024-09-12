import React from "react";
import { Box, Typography, Card, CardContent, Chip, Avatar, Button } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const SubtaskCard: React.FC = () => {
    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="h6">Sub Task 1</Typography>
                        <Chip label="In Progress" color="warning" />
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                        Due: 2024-09-30
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    
                    <Box display="flex" gap={1}>
                        <Avatar alt="Member 1" src="/path/to/avatar1.jpg" />
                        <Avatar alt="Member 2" src="/path/to/avatar2.jpg" />
                        <Avatar alt="Member 3" src="/path/to/avatar3.jpg" />
                    </Box>
                    <Button variant="text" color="primary">
                        <OpenInNewIcon />
                    </Button>
                </Box>

            </CardContent>
        </Card>
    );
};

export default SubtaskCard;