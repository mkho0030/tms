import React from "react";
import { Dialog } from "@mui/material";

import { ProjectTypes } from "../../../types/db-data";
import { CreateTask } from "./CreateTask";
import { DeleteTask } from "./DeleteTask";

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
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      {isCreateTask ? (
        <CreateTask project={project} handleClose={handleClose} />
      ) : (
        <DeleteTask handleClose={handleClose} />
      )}
    </Dialog>
  );
};

export default TableDialog;
