import { NextApiRequest, NextApiResponse } from "next";
import { verifyICalToken } from "../../../logics/ical/ical-auth";
import { ICalEvent, generateICal } from "../../../logics/ical/ical";
import { MongoClient } from "mongodb";
import clientPromise from "../../../utils/mongodb";
import { ProjectType, TaskType } from "../../../utils/mongo-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.query.token;
  if (typeof token !== "string") {
    return res.status(401);
  }
  const info = verifyICalToken(token);
  if (!info) {
    return res.status(401);
  }
  // TODO: get all future events for user and subscribed projects
  // TODO: move to db files after task api branch is merged
  const db = (await clientPromise).db("TMS");
  const projectsCol = db.collection<ProjectType>("ProjectData");
  const subscribedProjects = await projectsCol.find({
    members: { $in: [info.uid] },
    _id: { $in: info.projectIds },
  });
  const tasksCol = db.collection<TaskType>("TaskData");
  const assignedTasks = await tasksCol.find({});

  const events: ICalEvent[] = [];
  const icalString = generateICal(events);
  return res.status(200).send(icalString);
}
