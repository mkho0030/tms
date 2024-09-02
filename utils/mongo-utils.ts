import { v4 as uuidv4 } from "uuid";
import clientPromise from "./mongodb";

export type UserType = {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
};

export type ProjectType = {
  _id: string;
  members: string[];
  tasks: TaskType[];
  name: string;
  icon: string;
  createdOn: Date;
  updatedOn: Date;
};

export type TaskType = {
  _id: string;
  name: string;
  definition: string;
  startDate: Date;
  endDate: Date;
  assignees: string;
  children: TaskType[];
  status: string;
};

export const setUser = async (user: UserType): Promise<boolean> => {
  const client = await clientPromise;
  const db = client.db("TMS");
  const col = db.collection<UserType>("UserData");
  const result = await col.updateOne({ uid: user.uid }, { $set: user }, { upsert: true });

  return result.matchedCount === 1;
};

export const getUser = async (uid: string): Promise<UserType | null> => {
  const client = await clientPromise;
  const db = client.db("TMS");
  const col = db.collection<UserType>("UserData");
  const user = await col.findOne({ uid });
  return user;
};

export const createProject = async (name: string): Promise<ProjectType> => {
  const project: ProjectType = {
    _id: uuidv4(),
    members: [],
    tasks: [],
    name,
    icon: "default",
    createdOn: new Date(),
    updatedOn: new Date(),
  };

  const client = await clientPromise;
  const db = client.db("TMS");
  const col = db.collection<ProjectType>("ProjectData");
  const result = await col.insertOne(project);
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

export const getProjectsForUser = async (
  uid: string
): Promise<ProjectType[]> => {
  const client = await clientPromise;
  const db = client.db("TMS");
  const col = db.collection<ProjectType>("ProjectData");

  const projects = await col.find({ members: uid }).toArray();
  return projects;
};

export const addTaskToProject = async (
  projectId: string,
  task: TaskType
): Promise<boolean> => {
  const client = await clientPromise;
  const db = client.db("TMS");
  const col = db.collection<ProjectType>("ProjectData");

  const result = await col.updateOne(
    { _id: projectId },
    { $addToSet: { tasks: task } },
    { upsert: true }
  );
  return result.matchedCount === 1;
}

export const updateTaskInProject = async (
  projectId: string,
  task: TaskType
): Promise<boolean> => {
  const client = await clientPromise;
  const db = client.db("TMS");
  const col = db.collection<ProjectType>("ProjectData");

  const result = await col.updateOne(
    { _id: projectId, "tasks._id": task._id },
    { $set: { "tasks.$": task } }
  );
  return result.matchedCount === 1;
}

export const deleteTaskFromProject = async (
  projectId: string,
  taskId: string
): Promise<boolean> => {
  const client = await clientPromise;
  const db = client.db("TMS");
  const col = db.collection<ProjectType>("ProjectData");

  const result = await col.updateOne(
    { _id: projectId },
    { $pull: { tasks: { _id: taskId } } }
  );
  return result.matchedCount === 1;
}