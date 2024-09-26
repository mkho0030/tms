import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LinkTask from "../Dialog/LinkTask";
import { useTask } from "../../logics/providers/TaskContext";
import { OpenInNew } from "@mui/icons-material";
import dayjs from "dayjs";
import ProgressStatus from "../ProgressStatus";
import { useRouter } from "next/router";
import { CreateTask } from "../Dialog/CreateTask";
import { z } from "zod";
import { createTaskSchema } from "../Form/taskSchemas";
import { useTaskList } from "../../logics/providers/TaskListContext";

const Subtasks: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null);
  const router = useRouter();

  const { isLoading, task, refetchData } = useTask();
  const { submitCreateTaskForm } = useTaskList();

  const handleCreateSubTask = async (
    values: z.infer<typeof createTaskSchema>
  ) => {
    await submitCreateTaskForm({...values, parentId: task?._id});
    refetchData();
  };

  return (
    <Box flex={1} mt={4}>
      <Typography variant="subtitle1" color="grey.600" gutterBottom>
        Subtasks:
      </Typography>
      <Box display="flex" gap={2} my={2}>
        <Button
          variant="outlined"
          endIcon={<AddIcon />}
          fullWidth
          onClick={() => setOpen("create")}
        >
          Create new Subtask
        </Button>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIosIcon />}
          fullWidth
          onClick={() => setOpen("link")}
        >
          Link existing task
        </Button>
      </Box>
      {!isLoading &&
        task?.children?.map((subtask) => (
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h6">{subtask.name}</Typography>
                  <ProgressStatus status={subtask.status} />
                </Box>
                <Typography variant="body1" color="textSecondary">
                  Due: {dayjs(subtask.endDate).format("DD MMM YY")}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
              >
                <Box display="flex" gap={1}>
                  {subtask.assignees?.map((assigned, key) => (
                    <Chip
                      avatar={
                        <Avatar alt={assigned.name} src={assigned.photoUrl} />
                      }
                      variant="outlined"
                      label={assigned.name}
                      key={key}
                    />
                  ))}
                </Box>
                <IconButton
                  color="primary"
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_APP_URL}/teams/${subtask.projectId}/${subtask._id}`
                    )
                  }
                >
                  <OpenInNew />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      <Dialog open={open !== null} maxWidth="sm" fullWidth>
        {open == "link" && <LinkTask handleClose={() => setOpen(null)} />}
        {open == "create" && (
          <CreateTask
            projectId={task?.projectId}
            onSubmit={handleCreateSubTask}
            handleClose={() => setOpen(null)}
          />
        )}
      </Dialog>
    </Box>
  );
};

export default Subtasks;
