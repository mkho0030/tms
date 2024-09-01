import React from "react";
import { Box, Typography, Avatar, TextField, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from "../../logics/providers/AuthContext";

const Discussion: React.FC = () => {
    const { user } = useAuth();

    return (
        <Box flex={1}>
            <Typography variant="subtitle1" color='grey.600' gutterBottom>
                Discussion:
            </Typography>
            <Box display='flex' alignItems='center' gap='12px' mt={2}>
                <Avatar sx={{ width: 32, height: 32 }} src={user?.photoURL || ""} />
                <TextField variant='outlined' fullWidth placeholder="Add new comment"
                    InputProps={{
                        sx: {
                            height: '40px',
                            padding: '0 10px',
                        }
                    }} />
                <IconButton color='primary'>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Discussion;