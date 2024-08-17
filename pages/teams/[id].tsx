import { NextPage } from 'next';
import React from 'react';
import CustomToolbar from '../../components/Toolbar';
import DropdownsAndButtons from '../../components/TeamsPage/DropdownsAndButtons';
import TaskTable from '../../components/TeamsPage/TaskTable';

const Teams: NextPage = () => {
  return (
    <>
      <CustomToolbar />
      <DropdownsAndButtons />
      <TaskTable />
    </>
  );
};

export default Teams;
