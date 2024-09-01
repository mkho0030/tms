import React from "react";
import { Box, Typography, Avatar, TextField, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from "../../logics/providers/AuthContext";

const Discussion: React.FC = () => {
    const { user } = useAuth();
    
    // Sample messages with date, replace this with actual data from your state or props
    const messages = [
        { id: 1, name: "John Doe", message: "This is a sample message.", date: "2024-08-30 10:15 AM" },
        { id: 2, name: "Jane Smith", message: "Here is another message for the discussion.", date: "2024-08-30 11:00 AM" },
        { id: 3, name: "Alice Johnson", message: "Looking forward to the updates!", date: "2024-08-30 11:45 AM" }
    ];

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

            <List sx={{ mt: 2 }}>
                {messages.map((msg) => (
                    <ListItem key={msg.id} alignItems="flex-start" disableGutters>
                        <ListItemAvatar>
                            <Avatar>{msg.name.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={
                                <Box display="flex" alignItems="center">
                                    <Typography variant="subtitle2" color="text.primary">
                                        {msg.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                        {msg.date}
                                    </Typography>
                                </Box>
                            }
                            secondary={msg.message}
                            secondaryTypographyProps={{ variant: "body2", color: 'text.secondary' }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Discussion;