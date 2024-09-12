import { ProjectType } from "./mongo-projects";
import { TaskType } from "./mongo-tasks";
import clientPromise from "./mongodb";

export const getSubscribedProjectTasks = async (
  uid: string,
  projectIds: string[]
): Promise<TaskType[]> => {
  const client = await clientPromise;
  const db = client.db("TMS");
  const col = db.collection<TaskType>("TaskData");
  const result = await col
    .find({
      assignees: uid,
      projectid: projectIds.length > 0 ? { $in: projectIds } : undefined,
    })
    .toArray();
  return result;
};

export const getJoinedProjects = async (uid: string) => {
  const client = await clientPromise;
  const db = client.db("TMS");
  const col = db.collection<ProjectType>("ProjectData");
  const result = await col.find({ members: uid }).toArray();
  return result;
};
