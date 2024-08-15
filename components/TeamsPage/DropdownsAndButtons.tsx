import React, { useState } from 'react';
import { Box, Button, FormControl, Select, InputLabel, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const DropdownsAndButtons = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [selected2, setSelected2] = useState<string>('');
  const [selected3, setSelected3] = useState<string>('');
  const [selected4, setSelected4] = useState<string>('');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
        <FormControl sx={{ minWidth: 210 }}>
          <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="outlined"
            label="Search"
            sx={{ minWidth: 210 }}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel id="dropdown2">Assigned To</InputLabel>
          <Select
            labelId="dropdown2"
            value={selected2}
            onChange={(e) => setSelected2(e.target.value as string)}
            label="Assigned To"
          >
            <MenuItem value="">--Not Selected--</MenuItem>
            <MenuItem value="all">All</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="dropdown3">Due By</InputLabel>
          <Select
            labelId="dropdown3"
            value={selected3}
            onChange={(e) => setSelected3(e.target.value as string)}
            label="Due By"
          >
            <MenuItem value="">--Not Selected--</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="tomorrow">Tomorrow</MenuItem>
            <MenuItem value="this_week">This Week</MenuItem>
            <MenuItem value="next_week">Next Week</MenuItem>
            <MenuItem value="this_month">This Month</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="dropdown4">Progress Status</InputLabel>
          <Select
            labelId="dropdown4"
            value={selected4}
            onChange={(e) => setSelected4(e.target.value as string)}
            label="Progress Status"
          >
            <MenuItem value="">--Not Selected--</MenuItem>
            <MenuItem value="not_started">Not Started</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="outlined"
        sx={{
          borderColor: 'blue',
          color: 'blue',
          backgroundColor: 'white',
          '&:hover': {
            borderColor: 'darkblue',
            color: 'darkblue',
            backgroundColor: 'lightgray',
          },
        }}
      >
        <AddIcon />
        Add new task
      </Button>
    </Box>
  );
};

export default DropdownsAndButtons;