import { Grid } from "@mui/material";
import React from "react";
import CustomToolbar from "../../components/Toolbar";
import TaskTable from "../../components/TaskTable";

const MyTasks = () => {
  return (
    <>
      <CustomToolbar isTask />
      <TaskTable />
    </>
  );
};

export default MyTasks;
