// pages/teams/[id].tsx
import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import CustomToolbar from '../../components/Toolbar';

const Teams: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <CustomToolbar />
    </div>
  );
};

export default Teams;