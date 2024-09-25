import { NextApiRequest, NextApiResponse } from "next";
import { ICalEvent, generateICal } from "../../../logics/ical/ical";
import { verifyICalToken } from "../../../logics/ical/ical-auth";
import {
  getJoinedProjects,
  getSubscribedProjectTasks,
} from "../../../utils/mongo-ical";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.query.token;
  if (typeof token !== "string") {
    return res.status(401).json({ message: "Token is missing" });
  }
  const info = verifyICalToken(token);
  if (!info) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const projects = await getJoinedProjects(info.uid);
  const tasks = await getSubscribedProjectTasks(info.uid, info.projectIds);

  const projectsMap = projects.reduce((acc, project) => {
    acc[project._id] = project.name;
    return acc;
  }, {} as { [key: string]: string });

  const events: ICalEvent[] = tasks.map((task) => {
    return {
      id: task._id,
      datetime: new Date(task.endDate),
      createdOn: new Date(),
      updatedOn: new Date(),
      name: task.name,
      projectName: projectsMap[task.projectId],
    };
  });
  const icalString = generateICal(events);
  return res.status(200).json({ data: icalString, message: "Success" });
}
