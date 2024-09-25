import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTask } from "../../logics/providers/TaskContext";
import { Close, Edit, SaveAlt } from "@mui/icons-material";
import { TaskTypes } from "../../types/db-data";
import DeleteTask from "./TaskDialogs/DeleteTask";
import { UserType } from "../../utils/mongo-users";

const TaskHeader: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [onEdit, setOnEdit] = useState<boolean>(false);

  const { isLoading, task, deleteTask, updateTask, refetchData, generateIcal } = useTask();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOnDelete = async () => {
    if (task) {
      await deleteTask(task?._id);
      handleClose();
    }
  };

  const handleUpdateName = async (e: any) => {
    e.preventDefault();
    try {
      const res = await updateTask({
        ...task,
        // @ts-expect-error
        assignees: task?.assignees.map(
          (assigned) => (assigned as UserType).uid
        ),
        children: task?.children?.map(
          (subTask) => (subTask as TaskTypes)._id
        ) || [],
        name: e.target.name.value,
      });

      setIsOpen(false);
      refetchData();
    } catch (error) {}
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flex={"1 0 auto"}
      >
        {!onEdit ? (
          <>
            <Typography variant="h5" gutterBottom sx={{ m: 0, mr: 2 }}>
              {task?.name}
            </Typography>
            <IconButton onClick={() => setOnEdit(true)}>
              <Edit />
            </IconButton>
          </>
        ) : (
          <>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              flex={"1 0 auto"}
              component={"form"}
              noValidate
              onSubmit={handleUpdateName}
            >
              <TextField
                margin="none"
                id="name"
                name="name"
                variant="standard"
                defaultValue={task?.name}
                fullWidth
              />
              <IconButton type="submit">
                <SaveAlt />
              </IconButton>
              <IconButton onClick={() => setOnEdit(false)}>
                <Close />
              </IconButton>
            </Box>
          </>
        )}
      </Box>

      <Box display="flex" gap="20px">
        {/* <Button variant="text" color="primary" disabled={isLoading} onClick={generateIcal}>
          <CalendarTodayIcon sx={{ marginRight: "8px" }} />
          Add to calendar
        </Button> */}
        <Button
          variant="text"
          color="error"
          disabled={isLoading}
          onClick={() => setIsOpen(true)}
        >
          <DeleteIcon sx={{ marginRight: "8px" }} />
          Delete task
        </Button>
      </Box>
      <DeleteTask isOpen={isOpen} handleClose={handleClose} handleSubmit={handleOnDelete}/>
    </Box>
  );
};

export default TaskHeader;
