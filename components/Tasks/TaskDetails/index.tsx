import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Popper,
  Paper,
  MenuItem,
  Chip,
  Autocomplete,
  TextField,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { UserTypes } from "../../../types/db-data";
import ProgressStatus from "../../ProgressStatus";
import dayjs, { Dayjs } from "dayjs";
import { useTask } from "../../../logics/providers/TaskContext";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  AccessTimeRounded,
  Close,
  DoneRounded,
  EditCalendar,
  KeyboardArrowDown,
  PriorityHighRounded,
  SaveAlt,
} from "@mui/icons-material";

const TaskDetails: React.FC = () => {
  const { isLoading, task, updateTask, refetchData } = useTask();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const [editAssigned, setEditAssigned] = useState<boolean>(false);
  const [options, setOptions] = useState<UserTypes[]>([]);
  const [currentAssigned, setCurrentAssigned] = useState<UserTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/projects?id=${task?.projectId}`
      );
      const { data } = await res.json();
      return data;
    };

    fetchData()
      .then((res) => {
        setOptions(res.members);
        setCurrentAssigned(task?.assignees as UserTypes[]);
      })
      .catch(console.error);
    return () => {};
  }, [task]);

  const handleUpdateStatus = async (status: 0 | 1 | 2) => {
    try {
      const res = await updateTask({
        ...task,
        // @ts-expect-error
        assignees: task?.assignees.map(
          (assigned) => (assigned as UserTypes).uid
        ),
        status: status,
      });

      setAnchorEl(null);
      refetchData();
    } catch (error) {}
  };

  const handleUpdateDate = async (date: Dayjs) => {
    try {
      const res = await updateTask({
        ...task,
        // @ts-expect-error
        assignees: task?.assignees.map(
          (assigned) => (assigned as UserTypes).uid
        ),
        // @ts-expect-error
        endDate: date.toISOString(),
      });

      setAnchorEl(null);
      refetchData();
    } catch (error) {}
  };

  const handleUpdateAssignees = async () => {
    try {
      // @ts-expect-error
      const res = await updateTask({
        ...task,
        assignees: currentAssigned.map((member) => member.uid),
      });

      setAnchorEl(null);
      refetchData();
    } catch (error) {}
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mt={4}
      >
        <Box display="flex" flex={"1 0 auto"} gap={2} alignItems="center">
          <Typography variant="subtitle1" color="grey.600">
            Progress:
          </Typography>
          <Button
            variant="text"
            endIcon={<KeyboardArrowDown />}
            color="info"
            sx={{ textTransform: "none" }}
            onClick={handleClick}
            id="edit_status"
          >
            {task && <ProgressStatus status={task.status} />}
          </Button>
        </Box>
        <Box flex={"1 0 auto"} display="flex" gap={2} alignItems="center">
          <Typography variant="subtitle1" color="grey.600">
            Due Date:
          </Typography>
          <Typography variant="body1">
            {task && dayjs(task.endDate).format("DD MMMM YYYY")}
          </Typography>
          <IconButton onClick={handleClick} id="edit_date">
            <EditCalendar />
          </IconButton>
        </Box>
        <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
          <Paper>
            {anchorEl?.id == "edit_status" && (
              <Box py={2}>
                <MenuItem
                  onClick={() => handleUpdateStatus(0)}
                  sx={{ ml: 0 }}
                  disableRipple
                >
                  <PriorityHighRounded sx={{ mr: 2, color: "#3d3d3d" }} />
                  Not Started
                </MenuItem>
                <MenuItem
                  onClick={() => handleUpdateStatus(1)}
                  sx={{ ml: 0 }}
                  disableRipple
                >
                  <AccessTimeRounded sx={{ mr: 2, color: "#3d3d3d" }} />
                  In progress
                </MenuItem>
                <MenuItem
                  onClick={() => handleUpdateStatus(2)}
                  sx={{ ml: 0 }}
                  disableRipple
                >
                  <DoneRounded sx={{ mr: 2, color: "#3d3d3d" }} />
                  Completed
                </MenuItem>
              </Box>
            )}
            {anchorEl?.id == "edit_date" && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar onChange={handleUpdateDate} />
              </LocalizationProvider>
            )}
          </Paper>
        </Popper>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        mt={2}
      >
        <Typography variant="subtitle1" color="grey.600" sx={{ mr: 2 }} noWrap>
          Assigned To:
        </Typography>
        {editAssigned ? (
          <>
            <Autocomplete
              multiple
              sx={{ flex: "1 0 auto" }}
              value={currentAssigned}
              onChange={(event, selectedOptions) => {
                setCurrentAssigned(selectedOptions);
              }}
              options={options}
              getOptionLabel={(option) => option.uid}
              renderTags={(value: readonly UserTypes[], getTagProps) =>
                value.map((option, index: number) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
                      avatar={
                        <Avatar alt={option.name} src={option.photoUrl} />
                      }
                      variant="outlined"
                      label={option.name}
                      key={key}
                      {...tagProps}
                    />
                  );
                })
              }
              renderOption={(props, option) => (
                <MenuItem {...props} value={option.uid}>
                  <Avatar
                    sx={{ width: "28px", height: "28px", mr: 1 }}
                    alt={option.name}
                    src={option.photoUrl}
                  />
                  {option.name}
                </MenuItem>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Assignees"
                  variant="standard"
                />
              )}
            />
            <IconButton type="submit" onClick={() => handleUpdateAssignees()}>
              <SaveAlt />
            </IconButton>
            <IconButton onClick={() => setEditAssigned(false)}>
              <Close />
            </IconButton>
          </>
        ) : (
          <>
            {task?.assignees.map((assigned, index) => (
              <Box display="flex" alignItems="center" sx={{ mr: 1 }}>
                <Chip
                  avatar={
                    <Avatar
                      alt={(assigned as UserTypes).name}
                      src={(assigned as UserTypes).photoUrl}
                    />
                  }
                  variant="outlined"
                  label={(assigned as UserTypes).name}
                  key={index}
                />
              </Box>
            ))}
            <IconButton onClick={() => setEditAssigned(true)}>
              <PersonAddIcon />
            </IconButton>
          </>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mt={2}
      >
        <Typography variant="subtitle1" color="grey.600">
          Description:
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mt={2}
      >
        <Typography variant="body1">
          {task?.description ? task?.description : "No description"}
        </Typography>
      </Box>
    </>
  );
};

export default TaskDetails;
