import { NextApiRequest, NextApiResponse } from "next";
import { getRequestUser } from "../../../utils/auth-utils";
import {
  addTaskToProject,
  getTasksById,
  getTasksByUser,
} from "../../../utils/mongo-tasks";
import { getProjectById } from "../../../utils/mongo-projects";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = await getRequestUser(req);
  if (!uid) {
    return res.status(401).json({ message: "Unauthorised Access" });
  }

  // create team
  if (req.method === "POST") {
    const { projectId, name } = JSON.parse(req.body);
    const newTask = await addTaskToProject(projectId, name);

    return res.status(201).json({data: newTask, message: "Created"});
  }

  // get teams that user belongs to
  if (req.method === "GET") {
    const { id, projectId } = req.query;
    // individual task
    if (id != null) {
      const task = getTasksById(id as string);
      return res.status(200).json({data: task});
    }
    if (projectId != null) {
      const project = await getProjectById(projectId as string);
      if (!project) {
        return res.status(404).send({ message: "Project not found" });
      }
      const taskIds = project.taskIds;
      const tasks = taskIds.map(getTasksById);
      return res.status(200).json({data: tasks});
    }
    const tasks = await getTasksByUser(uid);
    return res.status(200).json({data:tasks});
  }
}
