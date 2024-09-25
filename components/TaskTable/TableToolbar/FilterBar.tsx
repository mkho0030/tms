import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProjectTypes } from "../../../types/db-data";
import { useTaskList } from "../../../logics/providers/TaskListContext";
import {
  AccessTimeRounded,
  DoneRounded,
  PriorityHighRounded,
} from "@mui/icons-material";
import { UserType } from "../../../utils/mongo-users";

const FilterBar = ({ project }: { project?: ProjectTypes }) => {
  const { taskList, filters, setFilters } = useTaskList();

  const [assigneList, setAssigneList] = useState<UserType[]>([]);

  useEffect(() => {
    if (project) {
      setAssigneList(project.members);
    } else {
      const assigneesList = taskList?.flatMap((task) => task.assignees);
      if (assigneesList)
        setAssigneList(
          assigneesList.filter((obj, index, arr) => {
            return (
              arr.findIndex((o) => {
                return JSON.stringify(o) === JSON.stringify(obj);
              }) === index
            );
          })
        );
    }

    return () => {};
  }, [taskList, project]);

  const handleAssigneesChange = (event: SelectChangeEvent<UserType[]>) => {
    const {
      target: { value },
    } = event;

    if (assigneList.length == value.length) {
      setFilters({
        ...filters,
        assigned: [],
      });
    } else {
      setFilters({
        ...filters,
        assigned: value as UserType[],
      });
    }
  };

  return (
    <>
      <FormControl sx={{ minWidth: "30%"}}>
        <InputLabel id="assigned">Assigned To</InputLabel>
        <Select
          multiple
          labelId="assigned"
          value={filters.assigned}
          onChange={handleAssigneesChange}
          label="Assigned To"
          placeholder="All"
          inputProps={{
            sx: { display: "flex", alignItems: "center", pr: 2},
          }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "no-wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value.uid}
                  label={value.name}
                  avatar={<Avatar alt={value.name} src={value.photoUrl} />}
                />
              ))}
            </Box>
          )}
        >
          {assigneList.map((member, index) => (
            // @ts-expect-error
            <MenuItem key={index} value={member}>
              <Checkbox checked={filters.assigned.includes(member)} />
              <ListItemAvatar sx={{ width: "28px", minWidth: "28px", mr: 1 }}>
                <Avatar
                  sx={{ width: "28px", height: "28px" }}
                  alt={member?.name}
                  src={member?.photoUrl}
                />
              </ListItemAvatar>
              <ListItemText primary={member.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{ width: "20%", maxWidth: "128px"}}
      >
        <InputLabel id="due_by">Due By</InputLabel>
        <Select
          labelId="due_by"
          value={filters.dueBy}
          onChange={(e) =>
            setFilters({ ...filters, dueBy: e.target.value as number })
          }
          label="Due By"
        >
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={1}>Today</MenuItem>
          <MenuItem value={2}>This Week</MenuItem>
          <MenuItem value={3}>Next Week</MenuItem>
          <MenuItem value={4}>This Month</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ width: "20%", maxWidth: "168px"}}
      >
        <InputLabel id="progress_status">Progress Status</InputLabel>
        <Select
          labelId="progress_status"
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value as number })
          }
          label="Progress Status"
          inputProps={{
            sx: { display: "flex", alignItems: "center", height: '24px !important' },
          }}
        >
          <MenuItem value={0}>
            <ListItemIcon
              sx={{ minWidth: "28px", width: "28px" }}
            ></ListItemIcon>
            <ListItemText>All</ListItemText>
          </MenuItem>
          <MenuItem value={1}>
            <ListItemIcon sx={{ minWidth: "23px", width: "2px" }}>
              <PriorityHighRounded sx={{ color: "#3d3d3d" }} />
            </ListItemIcon>
            <ListItemText>Not Started</ListItemText>
          </MenuItem>
          <MenuItem value={2}>
            <ListItemIcon sx={{ minWidth: "28px", width: "28px" }}>
              <AccessTimeRounded sx={{ mr: 2, color: "#3d3d3d" }} />
            </ListItemIcon>
            <ListItemText>In Progress</ListItemText>
          </MenuItem>
          <MenuItem value={3}>
            <ListItemIcon sx={{ minWidth: "28px", width: "28px" }}>
              <DoneRounded sx={{ mr: 2, color: "#3d3d3d" }} />
            </ListItemIcon>
            <ListItemText>Completed</ListItemText>
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default FilterBar;
