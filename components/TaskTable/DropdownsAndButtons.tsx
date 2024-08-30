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
  Menu,
  Divider,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  AccessTimeRounded,
  DeleteRounded,
  DoneRounded,
  ExpandMore,
  PriorityHighRounded,
} from "@mui/icons-material";
import TableDialog from "./TableDialog";
import useIsOpen from "../../logics/hooks/useIsOpen";

const DropdownsAndButtons = ({ isSelected }: { isSelected: any }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selected2, setSelected2] = useState<string>("");
  const [selected3, setSelected3] = useState<string>("");
  const [selected4, setSelected4] = useState<string>("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOnDelete = () => {
    handleMenuClose();
    handleOpen();
  };

  const { isOpen, handleOpen, handleClose } = useIsOpen();

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
      <Button
        sx={{ height: "40px" }}
        variant={isSelected ? "contained" : "outlined"}
        size="medium"
        onClick={(e) => (isSelected ? handleMenuOpen(e) : handleOpen())}
      >
        {isSelected ? (
          <>
            Task actions
            <ExpandMore />
          </>
        ) : (
          <>
            <AddIcon />
            Add new task
          </>
        )}
      </Button>
      <Menu
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            style: {
              maxWidth: "250px",
              width: "100vw",
            },
          },
        }}
      >
        <MenuItem onClick={handleMenuClose} disableRipple disabled>
          <Typography variant="subtitle2">Status Update</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} disableRipple>
          <PriorityHighRounded sx={{ mr: 2, color: "#3d3d3d" }} />
          Not Started
        </MenuItem>
        <MenuItem onClick={handleMenuClose} disableRipple>
          <AccessTimeRounded sx={{ mr: 2, color: "#3d3d3d" }} />
          In progress
        </MenuItem>
        <MenuItem onClick={handleMenuClose} disableRipple>
          <DoneRounded sx={{ mr: 2, color: "#3d3d3d" }} />
          Completed
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleOnDelete}
          disableRipple
          sx={{ color: "error.main" }}
        >
          <DeleteRounded sx={{ mr: 2 }} />
          Delete Task
        </MenuItem>
      </Menu>
      <TableDialog
        isOpen={isOpen}
        handleClose={handleClose}
        isCreateTask={!isSelected}
      />
    </Toolbar>
  );
};

export default DropdownsAndButtons;
