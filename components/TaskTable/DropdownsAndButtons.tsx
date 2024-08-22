import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Select,
  InputLabel,
  TextField,
  MenuItem,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const DropdownsAndButtons = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selected2, setSelected2] = useState<string>("");
  const [selected3, setSelected3] = useState<string>("");
  const [selected4, setSelected4] = useState<string>("");

  return (
    <Toolbar
      variant="dense"
      sx={{ display: "flex", width: "100%", py: 3, gap: 4 }}
    >
      <Box sx={{ display: "flex", gap: 2, flex: "1 0 auto" }}>
        <TextField
          sx={{ width: "40%", maxWidth: "250px" }}
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          label="Search"
        />
        <FormControl sx={{ width: "20%" }} size="small">
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
        <FormControl sx={{ width: "20%", maxWidth: "128px" }} size="small">
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
        <FormControl size="small" sx={{ width: "20%", maxWidth: "168px" }}>
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
      <Button sx={{ height: "40px" }} variant="outlined" size="medium">
        <AddIcon />
        Add new task
      </Button>
    </Toolbar>
  );
};

export default DropdownsAndButtons;
