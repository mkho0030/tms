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
  taskParentId?: string;
};

export const addTaskToProject = async (
  projectId: string,
  taskName: string,
  dueDate: string,
  assignees?: string[],
  description?: string,
  parentId?: string
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
		projectId: projectId,
    ...(parentId && {taskParentId: parentId})
	}  

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || "TMS");
  const col = db.collection<ProjectType>("ProjectData");

  const result = await col.updateOne(
    { _id: projectId },
    { $addToSet: { taskIds: task._id } }
  );

  const taskCol = db.collection<TaskType>("TaskData");
  await taskCol.insertOne(task);

  if (parentId) await addSubtaskToTask(parentId, task);

  return task;
};

export const addSubtaskToTask = async (
  parentId: string,
  task: TaskType
): Promise<boolean> => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || "TMS");
  const col = db.collection<TaskType>("TaskData");
  const parent = await col.findOne({ _id: parentId });

  if (!parent) {
    return false;
  }

  const result = await col.updateOne(
    { _id: parentId },
    { $addToSet: { children: task._id } }
  );

  return result.matchedCount === 1;
};

export const getTasksById = async (
  taskId: string
): Promise<TaskType | null> => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || "TMS");
  const col = db.collection<TaskType>("TaskData");
  const result = await col.findOne({ _id: taskId });
  return result;
};

export const getTasksByUser = async (userId: string): Promise<TaskType[]> => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || "TMS");
  const col = db.collection<TaskType>("TaskData");
  const result = await col.find({ assignees: userId }).toArray();
  return result;
};

export const updateTaskInProject = async (task: TaskType): Promise<boolean> => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || "TMS");
  const col = db.collection<TaskType>("TaskData");

  const existingTask = await col.findOne({ _id: task._id });

  if (existingTask) {
    const result = await col.updateOne({ _id: task._id }, { $set: task });
    return result.matchedCount === 1;
    // Assuming subtask depth is only 1
  } else {
    const parentTask = await col.findOne({ _id: task.taskParentId });
    if (!parentTask) {
      return false;
    }
    const result = await col.updateOne(
      { _id: parentTask._id },
      { $addToSet: { children: task._id } }
    );
    return result.matchedCount === 1;
  }
};

export const deleteTaskFromProject = async (
  projectId: string,
  taskId: string
): Promise<boolean> => {
  console.log(projectId, taskId);
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || "TMS");
  const col = db.collection<ProjectType>("ProjectData");
  const result = await col.updateOne(
    { _id: projectId },
    { $pull: { taskIds: taskId } }
  );

  const taskCol = db.collection<TaskType>("TaskData");
  const taskData = await taskCol.findOne({ _id: taskId });

  //Delete all children -> Calls recusively
  if(taskData?.children && taskData?.children.length > 0){
    await Promise.all(taskData.children.map((childId) => {
      deleteTaskFromProject(projectId, childId)
    }))
  }

  // Check if there is a parent. If there is, remove
  const parentTask = await taskCol.findOne({ _id: taskData?.taskParentId});
  if (parentTask) {
     await taskCol.updateOne(
      { _id: parentTask._id },
      { $pull: { children: taskId } }
    );
  }

  await taskCol.deleteOne({ _id: taskId });

  return result.matchedCount === 1;
};
