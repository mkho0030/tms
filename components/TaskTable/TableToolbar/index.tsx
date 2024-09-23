import React from "react";
import {
  Box,
  Button,
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
import TableDialog from "../TableDialog";
import useIsOpen from "../../../logics/hooks/useIsOpen";
import { ProjectTypes } from "../../../types/db-data";
import FilterBar from "./FilterBar";
import { useTaskList } from "../../../logics/providers/TaskListContext";

const TableToolbar = ({
  isSelected,
  project,
}: {
  isSelected: any;
  project?: ProjectTypes;
}) => {
  const { filters, setFilters, selected, updateStatus } = useTaskList();

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

  const handleStatusUpdate = async (status: number) => {
    await updateStatus(selected, status);
    handleMenuClose();
  };

  const { isOpen, handleOpen, handleClose } = useIsOpen();

  return (
    <Toolbar
      variant="dense"
      sx={{ display: "flex", width: "100%", py: 3, gap: 4 }}
    >
      <Box sx={{ display: "flex", gap: 2, flex: "1 0 auto" }}>
        {/* Search bar */}
        <TextField
          sx={{ width: "40%", maxWidth: "250px" }}
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          variant="outlined"
          label="Search"
        />
        {/* Filter Bar */}
        <FilterBar project={project} />
      </Box>
      <Button
        variant={isSelected ? "contained" : "outlined"}
        size="large"
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
        <MenuItem disableRipple disabled>
          <Typography variant="subtitle2">Status Update</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(0)} disableRipple>
          <PriorityHighRounded sx={{ mr: 2, color: "#3d3d3d" }} />
          Not Started
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(1)} disableRipple>
          <AccessTimeRounded sx={{ mr: 2, color: "#3d3d3d" }} />
          In progress
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(2)} disableRipple>
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
        project={project}
      />
    </Toolbar>
  );
};

export default TableToolbar;
