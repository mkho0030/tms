import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import CustomToolbar from "../../../components/Toolbar";
import TaskTable from "../../../components/TaskTable";
import { useRouter } from "next/router";

const Teams: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState();

  const router = useRouter();

  const { teamId } = router.query;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/projects?id=${teamId}`
      );
      const { data } = await res.json();
      console.log(data);
      return data;
    };

    fetchData()
      .then((res) => {
        setProjectData(res);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [router]);

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
