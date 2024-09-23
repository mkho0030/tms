import { NextApiRequest, NextApiResponse } from "next";
import { getRequestUser } from "../../../utils/auth-utils";
import {
  addTaskToProject,
  getTasksById,
  getTasksByUser,
  TaskType,
} from "../../../utils/mongo-tasks";
import { getProjectById } from "../../../utils/mongo-projects";
import { getUser } from "../../../utils/mongo-users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = await getRequestUser(req);
  if (!uid) {
    return res.status(401);
  }

  // create task
  if (req.method === "POST") {
    const { project_id, name, dueDate, assignees, description } = JSON.parse(
      req.body
    );
    const newTask = await addTaskToProject(
      project_id,
      name,
      dueDate,
      assignees,
      description
    );

    return res.status(201).json({data: newTask, message: 'Task Created Successfully'});
  }

  // get teams that user belongs to
  if (req.method === "GET") {
    const { id, projectId } = req.query;
    // individual task
    if (id) {
      const task = await getTasksById(id as string);
      if (!task || task == null)
        return res.status(404).json({ message: "Task not found" });

      const resData = await getFullTaskDetails(task);

      return res.status(200).json({ data: resData });
    }
    if (projectId) {
      const project = await getProjectById(projectId as string);
      if (!project) {
        return res.status(404).send({ error: "Project not found" });
      }
      const taskIds = project.taskIds;
      const tasks = await Promise.all(taskIds.map(getTasksById));

      let resTasks: any[] = [];

      if (tasks.length != 0) {
        resTasks = await Promise.all(
          tasks.map(async (task) => task != null && getFullTaskDetails(task))
        );
      }

      return res.status(200).json({ data: resTasks });
    }

    const tasks = await getTasksByUser(uid);

    if (tasks == null) {
      return res.status(200).json({ data: [] });
    }

    let resTasks: any[] = [];

    if (tasks.length != 0) {
      resTasks = await Promise.all(
        tasks.map(async (task) => task != null && getFullTaskDetails(task))
      );
    }
    return res.status(200).json({ data: resTasks });
  }
}

const getFullTaskDetails: any = async (task: TaskType) => {
  const subTask = await Promise.all(
    task?.children?.map((subTaskId) => getTasksById(subTaskId))
  );

  return {
    ...task,
    assignees: await Promise.all(
      task.assignees.map((assigned) => getUser(assigned))
    ),
    children: await Promise.all(
      subTask.map((subTask) => getFullTaskDetails(subTask))
    ),
  };
};
