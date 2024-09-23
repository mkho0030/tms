import { v4 as uuidv4 } from "uuid";
import clientPromise from "./mongodb";
import { ProjectType } from "./mongo-projects";

export type TaskType = {
  _id: string;
  name: string;
  definition: string;
  startDate: Date;
  endDate: Date;
  assignees: string[];
  children: string[];
  status: 0 | 1 | 2;
	projectId: string;
  createdOn?: Date;
  updatedOn?: Date;
};

export const addTaskToProject = async (
	projectId: string,
	taskName: string,
  dueDate: string,
  assignees?: string[],
  description?: string
): Promise<TaskType> => {
	const task: TaskType = {
		_id: uuidv4(),
		name: taskName,
		definition: description || "",
		startDate: new Date(),
		endDate: new Date(dueDate),
		assignees: assignees || [],
		children: [],
		status: 0,
		projectId: projectId
	}  

	const client = await clientPromise;
	const db = client.db("TMS");
	const col = db.collection<ProjectType>("ProjectData");

	const result = await col.updateOne(
		{ _id: projectId },
		{ $addToSet: { taskIds: task._id } }
	);

	const taskCol = db.collection<TaskType>("TaskData");
	await taskCol.insertOne(task);
  
	return task;
}

export const getTasksById = async (
	taskId: string
): Promise<TaskType | null> => {
	const client = await clientPromise;
	const db = client.db("TMS");
	const col = db.collection<TaskType>("TaskData");
	const result = await col.findOne( { _id: taskId } );
	return result
}

export const getTasksByUser = async (
	userId: string
): Promise<TaskType[] | null> => {
	const client = await clientPromise;
	const db = client.db("TMS");
	const col = db.collection<TaskType>("TaskData");
	const result = await col.find( { assignees: userId } ).toArray();
	return result
}


export const updateTaskInProject = async (
	task: TaskType
): Promise<boolean> => {
	const client = await clientPromise;
	const db = client.db("TMS");
	const col = db.collection<TaskType>("TaskData");
	const result = await col.updateOne({ _id: task._id }, { $set: task });
	return result.matchedCount === 1;
}

export const deleteTaskFromProject = async (
	projectId: string,
	taskId: string
): Promise<boolean> => {
  console.log(projectId, taskId)
	const client = await clientPromise;
	const db = client.db("TMS");
	const col = db.collection<ProjectType>("ProjectData");
	const result = await col.updateOne(
		{ _id: projectId },
		{ $pull: { taskIds: taskId } }
	);

	const taskCol = db.collection<TaskType>("TaskData");
	await taskCol.deleteOne({ _id: taskId });

	return result.matchedCount === 1;
}