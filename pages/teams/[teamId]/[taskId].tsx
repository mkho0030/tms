import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import CustomToolbar from "../../../components/Toolbar";
import TaskHeader from "../../../components/Tasks/TaskHeader";
import TaskDetails from "../../../components/Tasks/TaskDetails";
import Subtasks from "../../../components/Tasks/SubTasks";
import Discussion from "../../../components/Tasks/Discussion";
import { Paper, Box } from "@mui/material";
import { TaskProvider, useTask } from "../../../logics/providers/TaskContext";
import { useRouter } from "next/router";

const EditTask: NextPage = () => {
  const { isLoading, task } = useTask();

  const [projectData, setProjectData] = useState();

  const router = useRouter();

  const { teamId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/projects?id=${teamId}`
      );
      const data = await res.json();
      console.log(data);
      return data;
    };

    fetchData()
      .then((res) => {
        setProjectData(res);
      })
      .catch(console.error);
  }, [router]);

  return (
    <>
      <CustomToolbar isTask={false} project={projectData} />
      {!isLoading && (
        <Paper
          elevation={3}
          style={{
            margin: 0,
            padding: "20px",
            marginBottom: "24px",
            height: "100%",
            width: "100%",
          }}
        >
          <TaskHeader />
          <TaskDetails />
          <Subtasks />
        </Paper>
      )}
    </>
  );
};

export const TaskWithContext = () => {
  return (
    <TaskProvider>
      <EditTask />
    </TaskProvider>
  );
};

export default TaskWithContext;
