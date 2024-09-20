import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { ProjectTypes } from "../../../types/db-data";
import { useTaskTable } from "../../../logics/providers/TaskTableContext";

const FilterBar = ({ project }: { project?: ProjectTypes }) => {
  const { filters, setFilters } = useTaskTable();

  return (
    <>
      <FormControl sx={{ width: "20%" }} size="small">
        <InputLabel id="assigned">Assigned To</InputLabel>
        <Select
          labelId="assigned"
          value={filters.assigned}
          onChange={(e) => setFilters({ ...filters, assigned: e.target.value })}
          label="Assigned To"
        >
          <MenuItem value="">--All--</MenuItem>
          {project?.members?.map((member, index) => (
            <MenuItem key={index} value={member.uid}>
              <Avatar
                sx={{ width: "28px", height: "28px", mr: 1 }}
                alt={member.name}
                src={member.photoUrl}
              />
              {member.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "20%", maxWidth: "128px" }} size="small">
        <InputLabel id="due_by">Due By</InputLabel>
        <Select
          labelId="due_by"
          value={filters.dueBy}
          onChange={(e) =>
            setFilters({ ...filters, dueBy: e.target.value as number })
          }
          label="Due By"
        >
          <MenuItem value={0}>--Not Selected--</MenuItem>
          <MenuItem value={1}>Today</MenuItem>
          <MenuItem value={2}>This Week</MenuItem>
          <MenuItem value={3}>Next Week</MenuItem>
          <MenuItem value={4}>This Month</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: "20%", maxWidth: "168px" }}>
        <InputLabel id="progress_status">Progress Status</InputLabel>
        <Select
          labelId="progress_status"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          label="Progress Status"
        >
          <MenuItem value="">--Not Selected--</MenuItem>
          <MenuItem value={0}>Not Started</MenuItem>
          <MenuItem value={1}>In Progress</MenuItem>
          <MenuItem value={2}>Completed</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default FilterBar;
