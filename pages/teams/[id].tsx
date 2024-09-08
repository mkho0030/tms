import { NextPage } from "next";
import React from "react";
import CustomToolbar from "../../components/Toolbar";
import TaskTable from "../../components/TaskTable";

const Teams: NextPage = () => {
  return (
    <>
      <CustomToolbar isTask={false} />
      <TaskTable />
    </>
  );
};

export default Teams;
