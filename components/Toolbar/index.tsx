import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';

const avatars = [
  '/static/images/avatar/1.jpg', 
  '/static/images/avatar/2.jpg', 
  '/static/images/avatar/3.jpg'
];

function ResponsiveAppBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', width:'100%'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            FIT3161 Team
          </Typography>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center'}}>
            <Button sx={{ color: 'blue', mx: 1 }}>
                <OpenInNewIcon sx={{ mr: 1}}/>
              Copy Team Link
            </Button>
            <Button sx={{ color: 'blue', mx: 1 }}>
                <PersonAddIcon sx={{ mr: 1}}/>
              Add New Member
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              {avatars.map((src, index) => (
                <Avatar key={index} alt={`Member ${index + 1}`} src={src} sx={{ marginLeft: -1 }} />
              ))}
            </Box>

            <IconButton sx={{ ml: 1, color:"black"}}>
              <FormatAlignLeftIcon />
            </IconButton>
            <IconButton  sx={{ ml: 2, color: "black" }}>
              <CalendarTodayIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;