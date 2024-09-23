import { NextPage } from "next";
import React from "react";
import CustomToolbar from "../../../components/Toolbar";
import TaskTable from "../../../components/TaskTable";
import { useTaskList } from "../../../logics/providers/TaskListContext";

const Teams: NextPage = () => {
  const {isLoading, projectData} = useTaskList();
 
  return (
    <>
      <CustomToolbar
        isTask={false}
        project={projectData}
        isLoading={isLoading}
      />
      <TaskTable project={projectData} />
    </>
  );
};

export default Teams;
