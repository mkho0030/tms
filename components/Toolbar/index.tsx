import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import { AvatarGroup, Divider } from '@mui/material';

const avatars = [
  '/static/images/avatar/1.jpg', 
  '/static/images/avatar/2.jpg', 
  '/static/images/avatar/3.jpg'
];

function ResponsiveAppBar() {
  return (
        <Toolbar disableGutters sx={{ backgroundColor: 'white', width:'100%'}}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 400,
              letterSpacing: '.022rem',
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
              <AvatarGroup max={4}>
              <Avatar alt="Test" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Test" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Test" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Test" src="/static/images/avatar/4.jpg" />
              <Avatar alt="Test" src="/static/images/avatar/5.jpg" />
              </AvatarGroup>
            </Box>

            <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid gray',
              borderRadius: 1,
              ml: 2,
            }}
          >
            <IconButton sx={{ color: 'black' }}>
              <FormatAlignLeftIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'gray' }} />
            <IconButton sx={{ color: 'black' }}>
              <CalendarTodayIcon />
            </IconButton>
          </Box>
          </Box>
        </Toolbar>
  );
}

export default ResponsiveAppBar;