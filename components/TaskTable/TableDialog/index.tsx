import React from "react";
import { Dialog } from "@mui/material";

import { ProjectTypes } from "../../../types/db-data";
import { DeleteTask } from "./DeleteTask";
import { CreateTask } from "../../Dialog/CreateTask";
import { useTaskList } from "../../../logics/providers/TaskListContext";
import { createTaskSchema } from "../../Form/taskSchemas";
import { z } from "zod";

const TableDialog = ({
  isOpen,
  handleClose,
  isCreateTask,
  project,
}: {
  isOpen: boolean;
  handleClose: any;
  isCreateTask: boolean;
  project?: ProjectTypes;
}) => {
  const { submitCreateTaskForm } = useTaskList();

  const onCreateTask = async (values: z.infer<typeof createTaskSchema>)  => {
    try {
      await submitCreateTaskForm(values);
      handleClose();
    } catch (error) {}
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      {isCreateTask ? (
        <CreateTask projectId={project?._id} handleClose={handleClose} onSubmit={onCreateTask}/>
      ) : (
        <DeleteTask handleClose={handleClose} />
      )}
    </Dialog>
  );
};

export default TableDialog;
