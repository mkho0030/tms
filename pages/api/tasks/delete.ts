import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getRequestUser } from "../../../utils/auth-utils";
import { deleteTaskFromProject, getTasksById } from "../../../utils/mongo-tasks";
import { TaskTypes } from "../../../types/db-data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = await getRequestUser(req);
  if (!uid) {
    return res.status(401);
  }

  if (req.method === "DELETE") {
    const { taskIds } = JSON.parse(req.body);
    if (taskIds) {
      const taskData: TaskTypes[] = await Promise.all(taskIds.map(getTasksById));
      await Promise.all(
        taskData.map((task) => deleteTaskFromProject(task.projectId, task._id))
      );
      return res.status(200).json({ message: "Tasks deleted successfully" });
    }
  }

  return res.status(501).json({ message: "Forbidden request" });
}
