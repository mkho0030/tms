import { NextPage } from "next";
import React from "react";
import CustomToolbar from "../../components/Toolbar";
import TaskHeader from "../../components/Tasks/TaskHeader";
import TaskDetails from "../../components/Tasks/TaskDetails";
import Subtasks from "../../components/Tasks/SubTasks";
import Discussion from "../../components/Tasks/Discussion";
import { Paper, Box } from "@mui/material";

const EditTask: NextPage = () => {
  return (
    <>
      <CustomToolbar isTask={false} />
      <Paper
        elevation={3}
        style={{ margin: 0, padding: "20px", marginBottom: "24px", height: "100%", width: "100%" }}
      >
        <TaskHeader />
        <TaskDetails />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mt={4}
          gap="40px"
        >
          <Subtasks />
          <Discussion />
        </Box>
      </Paper>
    </>
  );
};

export default EditTask;
