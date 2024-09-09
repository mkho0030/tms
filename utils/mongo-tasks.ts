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
  children: TaskType[];
  status: string;
	projectId: string;
	taskParentId?: string;
};

export const addTaskToProject = async (
	projectId: string,
	taskName: string
): Promise<boolean> => {
	const task: TaskType = {
		_id: uuidv4(),
		name: taskName,
		definition: "Put your task details here.",
		startDate: new Date(),
		endDate: new Date(),
		assignees: [],
		children: [],
		status: "",
		projectId: projectId
	}  

	const client = await clientPromise;
	const db = client.db("TMS");
	const col = db.collection<ProjectType>("ProjectData");

	const result = await col.updateOne(
		{ _id: projectId },
		{ $addToSet: { taskids: task._id } }
	);

	const taskCol = db.collection<TaskType>("TaskData");
	await taskCol.insertOne(task);

	return result.matchedCount === 1;
}

export const addSubtaskToTask = async (
	taskId: string,
	subtaskName: string
): Promise<boolean> => {
	const client = await clientPromise;
	const db = client.db("TMS");
	const col = db.collection<TaskType>("TaskData");
	const parent = await col.findOne({ _id: taskId });

	if (!parent) {
		return false;
	}
	const parentProjectId = parent.projectId;

	const task: TaskType = {
		_id: uuidv4(),
		name: subtaskName,
		definition: "Put your task details here.",
		startDate: new Date(),
		endDate: new Date(),
		assignees: [],
		children: [],
		status: "",
		projectId: parentProjectId,
		taskParentId: taskId
	}

	const result = await col.updateOne(
		{ _id: taskId },
		{ $addToSet: { children: task } }
	);

	return result.matchedCount === 1;
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
	const client = await clientPromise;
	const db = client.db("TMS");
	const col = db.collection<ProjectType>("ProjectData");
	const result = await col.updateOne(
		{ _id: projectId },
		{ $pull: { taskids: taskId } }
	);

	const taskCol = db.collection<TaskType>("TaskData");
	await taskCol.deleteOne({ _id: taskId });

	return result.matchedCount === 1;
}