import { Close, West } from "@mui/icons-material";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  IconButton,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TaskTypes } from "../../types/db-data";
import { useTask } from "../../logics/providers/TaskContext";
import { UserType } from "../../utils/mongo-users";

const LinkTask = ({ handleClose }: { handleClose: () => void }) => {
  const router = useRouter();

  const { teamId, taskId } = router.query;
  const { task, updateTask, refetchData } = useTask();
  const [options, setOptions] = useState<TaskTypes[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks?projectId=${teamId}`,
        {
          method: "GET",
        }
      );
      const { data } = await res.json();
      return data;
    };

    fetchData().then((data) => {
      setOptions(data);
    });

    return () => {};
  }, [teamId]);

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updateTask({
        ...task,
        // @ts-expect-error
        assignees: task?.assignees.map(
          (assigned) => (assigned as UserType).uid
        ),

        children: [
          // @ts-expect-error
          ...task?.children?.map((subTask) => (subTask as TaskTypes)._id),
          e.target.childTask.value,
        ],
      });
      handleClose();
      refetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Link existing task
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          alignItems={"center"}
          justifyItems={"center"}
          mt={2}
          zIndex={100}
          component={"form"}
          id="link-task-form"
          onSubmit={handleOnSubmit}
        >
          <FormControl fullWidth>
            <InputLabel id="parent-task-label">Parent Task</InputLabel>
            <Select
              id="parent-task"
              name="parentTask"
              labelId="parent-task-label"
              value={taskId}
              label="Parent Task"
              disabled
            >
              {options?.map((task, index) => (
                <MenuItem key={index} value={task._id}>
                  {task.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <West sx={{ mx: 2 }} />
          <Box width={"100%"}>
            <FormControl fullWidth>
              <InputLabel id="child-task-label">Child Task</InputLabel>
              <Select
                id="child-task"
                name="childTask"
                labelId="child-task-label"
                fullWidth
                label="Child Task"
              >
                {options?.map(
                  (task, index) =>
                    task._id != taskId && (
                      <MenuItem key={index} value={task._id}>
                        {task.name}
                      </MenuItem>
                    )
                )}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="text" form={"link-task-form"}>
          Link task
        </Button>
      </DialogActions>
    </>
  );
};

export default LinkTask;
