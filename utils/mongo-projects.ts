import { v4 as uuidv4 } from "uuid";
import clientPromise from "./mongodb";


export type ProjectType = {
  _id: string;
  members: string[];
  taskIds: string[];
  name: string;
  icon: string;
  createdOn: Date;
  updatedOn: Date;
};


export const createProject = async (name: string): Promise<ProjectType> => {
  const project: ProjectType = {
    _id: uuidv4(),
    members: [],
    taskIds: [],
    name: name,
    icon: "default",
    createdOn: new Date(),
    updatedOn: new Date(),
  };

  const client = await clientPromise;
  const db = client.db("TMS");
  const col = db.collection<ProjectType>("ProjectData");
  await col.insertOne(project);
  return project;
};

export const addUserToProject = async (
  projectId: string,
  userId: string
): Promise<boolean> => {
  const client = await clientPromise;
  const db = client.db("TMS");
  const col = db.collection<ProjectType>("ProjectData");

  const result = await col.updateOne(
    { _id: projectId },
    { $addToSet: { members: userId } }
  );
  return result.matchedCount === 1;
};


